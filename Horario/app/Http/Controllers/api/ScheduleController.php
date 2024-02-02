<?php

namespace App\Http\Controllers\api;

use App\Models\Ambiente;
use App\Models\Asignacion;
use App\Models\Ficha;
use App\Models\HorarioAcademico;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    public function indexRecord(string $idFicha)
    {
        try {
            $recordInfo = HorarioAcademico::join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->select(
                    'fichas.ficha',
                    'fichas.horasAsignadas',
                    'trimestres.trimestre',
                    'trimestres.fechaInicio',
                    'trimestres.fechaFinal',
                    'programas.nombre',
                )
                ->where('fichas.idFicha', $idFicha)
                ->first();

            if (!$recordInfo) {
                return response()->json([
                    'error' => 'Record not found'
                ], Response::HTTP_NOT_FOUND); //404
            }

            return response()->json($recordInfo, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Data Error: " . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function scheduleApprentice(string $idFicha)
    {
        try{
            $schedule = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->select(
                    'asignaciones.boxIndex',
                    'ambientes.ambiente',
                    'usuarios.nombreCompleto',
                )
                ->where('horarios_academicos.idFicha', $idFicha)
                ->get();

            if (!$schedule) {
                return response()->json([
                    'error' => 'Schedule not found'
                ], Response::HTTP_NOT_FOUND); //404
            }

            return response()->json($schedule, Response::HTTP_OK); //200

        }catch (\Exception $e){
            return response()->json([
                'error' => "Get Schedule Apprentice Error ".$e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexInstructor()
    {
    }


    public function indexEnvironment()
    {
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idTrimestre' => 'required|numeric',
            'idFicha' => 'required|numeric',
            'globalStoreBoxes' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            //Inicio
            DB::beginTransaction();

            $data = $request->json()->all();
            $idTrimestre = $data['idTrimestre'];
            $idFicha = $data['idFicha'];
            $globalStoreBoxes = $data['globalStoreBoxes'];

            // Crear un nuevo horario académico
            $horarioAcademico = HorarioAcademico::create([
                'estado' => 'habilitado',
                'idFicha' => intval($idFicha),
                'idTrimestre' => intval($idTrimestre),
            ]);

            $asignaciones = [];
            $horasAntesInstructores = [];
            $horasAntesAmbientes = [];
            $horasAntesFicha = null;

            foreach ($globalStoreBoxes as $box) {

                $idInstructor = intval($box['idInstructor']);
                $idAmbiente = intval($box['idAmbiente']);

                // Obtener las horas antes solo si aún no se han obtenido antes para dicho [instructor]
                if (!isset($horasAntesInstructores[$idInstructor])) {
                    $horasAntesInstructores[$idInstructor] = Usuario::where('idUsuario', $idInstructor)->value('horasAsignadas');
                }
                // Obtener las horas antes solo si aún no se han obtenido antes para dicho [ambiente]
                if (!isset($horasAntesAmbientes[$idAmbiente])) {
                    $horasAntesAmbientes[$idAmbiente] = Ambiente::where('idAmbiente', $idAmbiente)->value('horasAsignadas');
                }

                if ($horasAntesFicha == null) {
                    $horasAntesFicha = Ficha::where('idFicha', $idFicha)->value('horasAsignadas');
                }

                $nombreInstructor = Usuario::where('idUsuario', $idInstructor)->value('nombreCompleto');
                $numeroAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('ambiente');
                $numeroFicha = Ficha::where('idFicha', $idFicha)->value('ficha');

                // Obtener el límite de horas para el instructor y ambiente
                $limiteHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('limiteHoras');
                $limiteHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('limiteHoras');
                $limiteHorasFicha = Ficha::where('idFicha', $idFicha)->value('limiteHoras');

                $disponibilidadInstructor = $limiteHorasInstructor - $horasAntesInstructores[$idInstructor];
                $disponibilidadAmbiente = $limiteHorasAmbiente - $horasAntesAmbientes[$idAmbiente];
                $disponibilidadFicha = $limiteHorasFicha - $horasAntesFicha;

                if ($limiteHorasInstructor !== null && $limiteHorasAmbiente !== null) {

                    $nuevasHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('horasAsignadas') + 1;
                    $nuevasHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('horasAsignadas') + 1;
                    $nuevasHorasFicha = Ficha::where('idFicha', $idFicha)->value('horasAsignadas') + 1;

                    if ($nuevasHorasInstructor > $limiteHorasInstructor) {

                        // Si el incremento supera el límite: 
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El instructor '{$nombreInstructor}' ha alcanzado el límite de horas permitido: '{$limiteHorasInstructor} horas'. Por favor, revise la cantidad de veces que dicho instructor es asignado, considerando que dispone de '{$disponibilidadInstructor} horas' para impartir formación.",
                            'error' => "The action cannot be performed. The limit of assigned hours is exceeded",
                        ], Response::HTTP_BAD_REQUEST); //400
                    }

                    if ($nuevasHorasAmbiente > $limiteHorasAmbiente) {

                        //Cancelar
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El ambiente '{$numeroAmbiente}' ha alcanzado el límite de horas permitido: '{$limiteHorasAmbiente} horas'. Por favor, revise la cantidad de veces que dicho ambiente es asignado, considerando que dispone de '{$disponibilidadAmbiente} horas'.",
                            'error' => "The action cannot be performed. The limit of assigned hours is exceeded",
                        ], Response::HTTP_BAD_REQUEST); //400
                    }

                    if ($nuevasHorasFicha > $limiteHorasFicha) {

                        //Si el incremento supera el limite:
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "La ficha '{$numeroFicha}' ha alcanzado el límite de horas permitido: '{$limiteHorasFicha} horas'. Por favor, revise la cantidad de veces que dicha ficha recibe asignaciones, considerando que dispone de '{$disponibilidadFicha} horas'.",
                            'error' => 'The action cannot be performed. The limit of assigned hours is exceeded',
                        ]);
                    }
                }

                Usuario::where('idUsuario', $idInstructor)->update([
                    'horasAsignadas' => DB::raw('horasAsignadas + 1'),
                    //Mas columnas...
                ]);

                Ambiente::where('idAmbiente', $idAmbiente)->update([
                    'horasAsignadas' => DB::raw('horasAsignadas + 1'),
                    //Mas columnas...
                ]);

                Ficha::where('idFicha', $idFicha)->update([
                    'horasAsignadas' => DB::raw('horasAsignadas + 1'),
                    //Mas columnas...
                ]);

                $asignaciones[] = [
                    'boxIndex' => $box['boxIndex'],
                    'idAmbiente' => intval($box['idAmbiente']),
                    'idUsuario' => intval($box['idInstructor']),
                    'idHorarioAcademico' => $horarioAcademico->idHorario,
                ];
            }

            // Insertar asignaciones en lote
            Asignacion::insert($asignaciones);

            //Confirmar
            DB::commit();

            return response()->json([
                'status' => 1,
                'message' => 'Successfully created academic schedule'
            ], Response::HTTP_CREATED); //201
        } catch (\Exception $e) {

            //Cancelar
            DB::rollBack();
            return response()->json([
                'error' => "Register Schedule Error: " . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show()
    {
    }
}
