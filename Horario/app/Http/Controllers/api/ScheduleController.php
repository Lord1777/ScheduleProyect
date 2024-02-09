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
        try {
            $idTrimestre = HorarioAcademico::join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->where('horarios_academicos.idFicha', $idFicha)
                ->orderBy('trimestres.fechaInicio', 'desc')
                ->select('trimestres.idTrimestre')
                ->first();

            $schedule = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->select(
                    'asignaciones.boxIndex',
                    'ambientes.ambiente',
                    'usuarios.nombreCompleto',
                )
                ->where('horarios_academicos.idFicha', $idFicha)
                ->where('horarios_academicos.idTrimestre', $idTrimestre['idTrimestre'])
                ->get();

            if (!$schedule) {
                return response()->json([
                    'error' => 'Schedule not found'
                ], Response::HTTP_NOT_FOUND); //404
            }

            return response()->json($schedule, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Apprentice Error " . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexInstructor()
    {
    }

    public function scheduleInstructor(string $idUsuario, string $idTrimestre, string $idFicha)
    {
        try {
            if ($idFicha && $idTrimestre) {

                $schedule = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                    ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                    ->select(
                        'asignaciones.boxIndex',
                        'ambientes.ambiente',
                        'usuarios.nombreCompleto',
                    )
                    ->where('horarios_academicos.idFicha', $idFicha)
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->get();

                if (!$schedule) {
                    return response()->json([
                        'error' => 'Schedule not found'
                    ], Response::HTTP_NOT_FOUND); //404
                }
                return response()->json($schedule, Response::HTTP_OK); //200

            } else if ($idFicha) {

                $trimestre = HorarioAcademico::join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->where('horarios_academicos.idFicha', $idFicha)
                    ->orderBy('trimestres.fechaInicio', 'desc')
                    ->select('trimestres.idTrimestre')
                    ->first();

                $schedule = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                    ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                    ->select(
                        'asignaciones.boxIndex',
                        'ambientes.ambiente',
                        'usuarios.nombreCompleto',
                    )
                    ->where('horarios_academicos.idFicha', $idFicha)
                    ->where('horarios_academicos.idTrimestre', $trimestre['idTrimestre'])
                    ->get();

                if (!$schedule) {
                    return response()->json([
                        'error' => 'Schedule not found'
                    ], Response::HTTP_NOT_FOUND); //404
                }
                return response()->json($schedule, Response::HTTP_OK); //200

            } else if ($idTrimestre) {

                $schedule = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                    ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                    ->select(
                        'fichas.ficha',
                        'ambientes.ambiente',
                        'asignaciones.boxIndex',
                        'usuarios.nombreCompleto',
                    )
                    ->where('usuarios.idUsuario', $idUsuario)
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->get();

                if (!$schedule) {
                    return response()->json([
                        'error' => 'Schedule not found'
                    ], Response::HTTP_NOT_FOUND); //404
                }
                return response()->json($schedule, Response::HTTP_OK); //200
            }

            $schedule = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->select(
                    'fichas.ficha',
                    'ambientes.ambiente',
                    'asignaciones.boxIndex',
                )
                ->where('usuarios.idUsuario', $idUsuario)
                ->get();

            if (!$schedule) {
                return response()->json([
                    'error' => 'Schedule not found'
                ], Response::HTTP_NOT_FOUND); //404
            }
            return response()->json($schedule, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Instructor Error " . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
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

                $boxIndex = intval($box['boxIndex']);
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

                // Obtener el límite de horas para el instructor, ambiente y ficha
                $limiteHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('limiteHoras');
                $limiteHorasDiarioInstructor = 10;
                $limiteHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('limiteHoras');
                $limiteHorasFicha = Ficha::where('idFicha', $idFicha)->value('limiteHoras');

                $disponibilidadInstructor = $limiteHorasInstructor - $horasAntesInstructores[$idInstructor];
                $disponibilidadAmbiente = $limiteHorasAmbiente - $horasAntesAmbientes[$idAmbiente];
                $disponibilidadFicha = $limiteHorasFicha - $horasAntesFicha;

                // Evitar asignaciones simultaneas en la misma casilla
                $instructorAsignado = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->where('asignaciones.idUsuario', $idInstructor)
                    ->select('asignaciones.boxIndex')
                    ->get();
                $ambienteAsignado = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->where('asignaciones.idAmbiente', $idAmbiente)
                    ->select('asignaciones.boxIndex')
                    ->get();
                $fichaAsignadaInstructor = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->where('asignaciones.idUsuario', $idInstructor)
                    ->where('asignaciones.boxIndex', $boxIndex)
                    ->select('fichas.ficha')
                    ->first();
                $fichaAsignadaAmbiente = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->where('asignaciones.idAmbiente', $idAmbiente)
                    ->where('asignaciones.boxIndex', $boxIndex)
                    ->select('fichas.ficha')
                    ->first();

                if ($instructorAsignado->isNotEmpty()) {

                    if ($fichaAsignadaInstructor !== null) {

                        //Si existe superposición de asignación
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El instructor '{$nombreInstructor}' ya está asignado en la ficha '{$fichaAsignadaInstructor['ficha']}' específicamente en las casillas marcadas en rojo",
                            'error' => 'This action cannot be performed. Duplicate assignment in the same box',
                            'duplicates' => $instructorAsignado,
                        ], Response::HTTP_BAD_REQUEST); //400
                    } else {
                        return response()->json([
                            'status' => 0,
                            'message' => "No se encontraron asignaciones para el instructor '{$nombreInstructor}' en la(s) caja(s) especificadas.",
                            'error' => 'No assignments found for the instructor in the specified boxIndex',
                        ], Response::HTTP_NOT_FOUND); //404
                    }
                }
                if ($ambienteAsignado->isNotEmpty()) {

                    if ($fichaAsignadaAmbiente !== null) {
                        //Si existe superposición de asignación
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El ambiente '{$numeroAmbiente}' ya está asignado en la ficha '{$fichaAsignadaAmbiente['ficha']}' especificamente en las casillas marcadas en rojo",
                            'error' => 'This action cannot be performed. Duplicate assignment in the same box',
                            'duplicates' => $ambienteAsignado,
                        ], Response::HTTP_BAD_REQUEST); //400
                    } else {
                        return response()->json([
                            'status' => 0,
                            'message' => "No se encontraron asignaciones para el ambiente '{$numeroAmbiente}' en la(s) caja(s) especificadas.",
                            'error' => 'No assignments found for the instructor in the specified boxIndex',
                        ], Response::HTTP_NOT_FOUND); //404
                    }
                }

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

    public function indexEnable()
  { 
    try {
        $records = HorarioAcademico::join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')

            ->select(
                'fichas.ficha',
                'horarios_academicos.idHorario',
                'fichas.idFicha'
            )
            ->where('horarios_academicos.estado', 'habilitado')
            ->get();

        if ($records->isEmpty()) {
            return response()->json([
                'status' => 0,
                'error' => 'Schedule Not Found'
            ], Response::HTTP_NOT_FOUND); //404
        }

        return response()->json($records, Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error Getting Schedule: ' . $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
  }

  public function EnableSchedulesInstructors()
  { 
    try {
        $asign = Asignacion::join('horarios_academicos', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                           ->join('usuarios', 'usuarios.idUsuario', '=', 'asignaciones.idUsuario')

            ->select(
                'usuarios.nombreCompleto',
                'horarios_academicos.idHorario', 
                'usuarios.idUsuario',
            )
            ->where('horarios_academicos.estado', 'habilitado')
            ->get();

        if ($asign->isEmpty()) {
            return response()->json([
                'status' => 0,
                'error' => 'Schedule Not Found'
            ], Response::HTTP_NOT_FOUND); //404
        }

        return response()->json($records, Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error Getting Schedule: ' . $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
  }
}
