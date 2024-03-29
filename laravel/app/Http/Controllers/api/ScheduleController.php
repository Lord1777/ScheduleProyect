<?php

namespace App\Http\Controllers\api;

use App\Models\Ambiente;
use App\Models\Asignacion;
use App\Models\Ficha;
use App\Models\HorarioAcademico;
use App\Models\Trimestre;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class ScheduleController extends Controller
{
    public function indexRecord(string $idFicha, string $idHorario = 'null')
    {
        try {
            if ($idHorario !== 'null') {
                $recordInfo = HorarioAcademico::join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->select(
                        'fichas.ficha',
                        'fichas.horasAsignadas',
                        'trimestres.idTrimestre',
                        'trimestres.trimestre',
                        'trimestres.fechaInicio',
                        'trimestres.fechaFinal',
                        'programas.nombre',
                    )
                    ->where('fichas.idFicha', $idFicha)
                    ->where('horarios_academicos.idHorario', $idHorario)
                    ->first();

                if (!$recordInfo) {
                    return response()->json([
                        'error' => 'Record not found'
                    ], Response::HTTP_NOT_FOUND); //404
                }

                return response()->json($recordInfo, Response::HTTP_OK); //200
            }

            // Obtener el ID del último trimestre asociado a la ficha
            $idTrimestre = HorarioAcademico::join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->where('fichas.idFicha', $idFicha)
                ->orderBy('trimestres.fechaInicio', 'desc')
                ->select('trimestres.idTrimestre')
                ->first();

            if (!$idTrimestre) {
                return response()->json([
                    'error' => 'Trimestre not found for the specified ficha'
                ], Response::HTTP_NOT_FOUND);
            }

            $recordInfo = HorarioAcademico::join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->select(
                    'fichas.ficha',
                    'fichas.horasAsignadas',
                    'trimestres.idTrimestre',
                    'trimestres.trimestre',
                    'trimestres.fechaInicio',
                    'trimestres.fechaFinal',
                    'programas.nombre',
                )
                ->where('fichas.idFicha', $idFicha)
                ->where('horarios_academicos.idTrimestre', $idTrimestre->idTrimestre)
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

    public function scheduleFichaGetIdTrimestre(string $idFicha, string $idTrimestre)
    {
        try {
            $schedule = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->select(
                    'asignaciones.boxIndex',
                    'ambientes.ambiente',
                    'ambientes.idAmbiente',
                    'usuarios.nombreCompleto',
                    'usuarios.idUsuario',
                )
                ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->where('fichas.idFicha', $idFicha)
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->get();

            if ($schedule->isEmpty()) {
                return response()->json([
                    'error' => 'Schedule not found'
                ], Response::HTTP_NOT_FOUND); //404
            }

            return response()->json($schedule, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Record Error " . $e->getMessage(),
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
                    'ambientes.idAmbiente',
                    'usuarios.nombreCompleto',
                    'usuarios.idUsuario',
                )
                ->where('horarios_academicos.idFicha', $idFicha)
                ->where('horarios_academicos.idTrimestre', $idTrimestre['idTrimestre'])
                ->where('horarios_academicos.estado', 'habilitado')
                ->get();

            Log::info($schedule);
            Log::info('Tipo de datos de $schedule: ' . gettype($schedule));
            Log::info('Contenido de $schedule: ' . json_encode($schedule));

            if (!$schedule || $schedule->isEmpty()) {
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


    public function scheduleRecord(string $idFicha, string $idHorario)
    {
        try {
            $schedule = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->select(
                    'asignaciones.boxIndex',
                    'ambientes.ambiente',
                    'ambientes.idAmbiente',
                    'usuarios.nombreCompleto',
                    'usuarios.idUsuario',
                )
                ->where('horarios_academicos.idHorario', $idHorario)
                ->get();

            if (!$schedule) {
                return response()->json([
                    'error' => 'Schedule not found'
                ], Response::HTTP_NOT_FOUND); //404
            }

            return response()->json($schedule, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Record Error " . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function scheduleInstructor(string $idUsuario, string $idTrimestre, string $idFicha)
    {
        try {
            if ($idFicha !== 'null' && $idTrimestre !== 'null') {

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
                    ->where('horarios_academicos.estado', 'habilitado')
                    ->get();

                if ($schedule->isEmpty()) {
                    return response()->json([
                        'error' => 'No hay un horario académico disponible para la ficha y el trimestre seleccionados.'
                    ], Response::HTTP_NOT_FOUND); //404
                }
                return response()->json($schedule, Response::HTTP_OK); //200

            } else if ($idFicha !== 'null') {

                $trimestre = HorarioAcademico::join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->where('horarios_academicos.idFicha', $idFicha)
                    ->orderBy('trimestres.fechaInicio', 'desc')
                    ->select('trimestres.idTrimestre')
                    ->first();

                if ($trimestre == null) {
                    return response()->json([
                        'error' => 'No hay un horario académico para la ficha seleccionada',
                    ], Response::HTTP_NOT_FOUND); //404

                } else {
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
                        ->where('horarios_academicos.estado', 'habilitado')
                        ->get();

                    if ($schedule->isEmpty()) {
                        return response()->json([
                            'error' => 'Schedule not found'
                        ], Response::HTTP_NOT_FOUND); //404
                    }
                    return response()->json($schedule, Response::HTTP_OK); //200
                }
            } else if ($idTrimestre !== 'null') {

                $schedule = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                    ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                    ->select(
                        'fichas.ficha',
                        'ambientes.ambiente',
                        'asignaciones.boxIndex',
                    )
                    ->where('usuarios.idUsuario', $idUsuario)
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->where('horarios_academicos.estado', 'habilitado')
                    ->get();
                // Log::info('Tipo de $schedule: ' . gettype($schedule));
                // Log::info('Contenido de $schedule: ' . json_encode($schedule));

                if ($schedule->isEmpty()) {
                    return response()->json([
                        'error' => 'Estimado instructor, no hay un horario académico disponible para usted en el trimestre seleccionado.'
                    ], Response::HTTP_NOT_FOUND); //404
                }
                return response()->json($schedule, Response::HTTP_OK); //200
            }

            // Obtener el último trimestre asignado al instructor
            $ultimoTrimestre = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->where('asignaciones.idUsuario', $idUsuario)
                ->orderBy('trimestres.fechaInicio', 'desc')
                ->pluck('trimestres.idTrimestre')
                ->first();

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
                ->where('horarios_academicos.idTrimestre', $ultimoTrimestre)
                ->where('horarios_academicos.estado', 'habilitado')
                ->get();

            if ($schedule->isEmpty()) {
                return response()->json([
                    'error' => 'Estimado instructor, actualmente no se ha creado un horario académico para usted.'
                ], Response::HTTP_NOT_FOUND); //404
            }
            return response()->json($schedule, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Instructor Error " . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function scheduleAdminInstructor(string $idUsuario, string $idTrimestre)
    {
        try {

            $schedule = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->select(
                    'horarios_academicos.idHorario',
                    'fichas.idFicha',
                    'fichas.ficha',
                    'ambientes.ambiente',
                    'asignaciones.boxIndex',
                )
                ->where('usuarios.idUsuario', $idUsuario)
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->get();
            // Log::info('Tipo de $schedule: ' . gettype($schedule));
            // Log::info('Contenido de $schedule: ' . json_encode($schedule));

            if ($schedule->isEmpty()) {
                return response()->json([
                    'status' => 0,
                    'error' => 'No existe un horario academico para el instructor seleccionado'
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

    public function scheduleEnvironment(Request $request, string $idAmbiente, string $idTrimestre)
    {
        try {
            $schedule = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->select(
                    'horarios_academicos.idHorario',
                    'fichas.idFicha',
                    'fichas.ficha',
                    'ambientes.ambiente',
                    'usuarios.nombreCompleto',
                    'asignaciones.boxIndex',
                )
                ->where('ambientes.idAmbiente', $idAmbiente)
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->get();

            if ($schedule->isEmpty()) {
                return response()->json([
                    'error' => 'No hay un horario académico disponible para el ambiente en el trimestre seleccionado.'
                ], Response::HTTP_NOT_FOUND); //404
            }
            return response()->json($schedule, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Get Schedule Environment Error " . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
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
        // $limiteHorasInstructorContratistaSemanal = 35;
        // $limiteHorasFichasSemanal = 40;
        // $limiteHorasInstructorPlantaSemanal = 40;
        // $limiteHorasAmbienteSemanal = 96;

        try {

            //Inicio
            DB::beginTransaction();

            $data = $request->json()->all();
            $idTrimestre = $data['idTrimestre'];
            $idFicha = $data['idFicha'];
            $globalStoreBoxes = $data['globalStoreBoxes'];

            $scheduleIsDefined = HorarioAcademico::where('idFicha', $idFicha)
                ->where('idTrimestre', $idTrimestre)
                ->get();

            $numeroFicha = Ficha::where('idFicha', $idFicha)->value('ficha');

            if (!$scheduleIsDefined->isEmpty()) {

                //Cancelar
                DB::rollBack();

                return response()->json([
                    'status' => 0,
                    'message' => "Ya existe un horario académico para la ficha ($numeroFicha) dentro del trimestre seleccionado",
                    'error' => 'There is already an academic schedule'
                ], Response::HTTP_METHOD_NOT_ALLOWED); //405
            }

            //Reiniciar las horasAsignadas de instructores, ambientes y fichas 
            Usuario::query()->update(['horasAsignadas' => 0]);
            Ambiente::query()->update(['horasAsignadas' => 0]);
            Ficha::query()->update(['horasAsignadas' => 0]);


            // Crear un nuevo horario académico
            $horarioAcademico = HorarioAcademico::create([
                'estado' => 'inhabilitado',
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

                //Obtener cantidad de horas asignadas hasta el momento
                $asignacionesInstructor = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('asignaciones.idUsuario', $idInstructor)
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->get();
                $asignacionesAmbiente = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('asignaciones.idAmbiente', $idAmbiente)
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->get();
                $asignacionesFicha = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('horarios_academicos.idFicha', $idFicha)
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->get();

                // Obtener las horas antes solo si aún no se han obtenido antes para dicho [instructor]
                if (!isset($horasAntesInstructores[$idInstructor])) {
                    $horasAntesInstructores[$idInstructor] = $asignacionesInstructor->count();
                }
                // Obtener las horas antes solo si aún no se han obtenido antes para dicho [ambiente]
                if (!isset($horasAntesAmbientes[$idAmbiente])) {
                    $horasAntesAmbientes[$idAmbiente] = $asignacionesAmbiente->count();
                }
                // Obtener las horas antes solo si aún no se han obtenido antes para dicha ficha
                if ($horasAntesFicha == null) {
                    $horasAntesFicha = $asignacionesFicha->count();
                }

                $nombreInstructor = Usuario::where('idUsuario', $idInstructor)->value('nombreCompleto');
                $numeroAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('ambiente');

                // Obtener el límite de horas para el instructor, ambiente y ficha
                $limiteHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('limiteHoras');
                $limiteHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('limiteHoras');
                $limiteHorasFicha = Ficha::where('idFicha', $idFicha)->value('limiteHoras');

                //Obtener cantidad de horas que dispone para ser asignado
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
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->where('asignaciones.idUsuario', $idInstructor)
                    ->where('asignaciones.boxIndex', $boxIndex)
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->select('fichas.ficha')
                    ->first();
                $fichaAsignadaAmbiente = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->where('asignaciones.idAmbiente', $idAmbiente)
                    ->where('asignaciones.boxIndex', $boxIndex)
                    ->where('trimestres.idTrimestre', $idTrimestre)
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
                    } /* else {

     Log::info($fichaAsignadaInstructor);

     return response()->json([
         'status' => 0,
         'message' => "No se encontraron asignaciones para el instructor '{$nombreInstructor}' en la(s) caja(s) especificadas.",
         'error' => 'No assignments found for the instructor in the specified boxIndex',
     ], Response::HTTP_NOT_FOUND); //404
 }
 */
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
                    } /*else {
     return response()->json([
         'status' => 0,
         'message' => "No se encontraron asignaciones para el ambiente '{$numeroAmbiente}' en la(s) caja(s) especificadas.",
         'error' => 'No assignments found for the instructor in the specified boxIndex',
     ], Response::HTTP_NOT_FOUND); //404
 }
 */
                }

                if ($limiteHorasInstructor !== null && $limiteHorasAmbiente !== null && $limiteHorasFicha !== null) {

                    $nuevasHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('horasAsignadas') + 1;
                    $nuevasHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('horasAsignadas') + 1;
                    $nuevasHorasFicha = Ficha::where('idFicha', $idFicha)->value('horasAsignadas') + 1;

                    if (($nuevasHorasInstructor > $limiteHorasInstructor) || ($disponibilidadInstructor - $nuevasHorasInstructor < 0)) {

                        // Si el incremento supera el límite: 
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El instructor '{$nombreInstructor}' ha alcanzado el límite de horas permitido: '{$limiteHorasInstructor} horas'. Por favor, revise la cantidad de veces que dicho instructor es asignado, considerando que dispone de '{$disponibilidadInstructor} horas' para impartir formación.",
                            'error' => "The action cannot be performed. The limit of assigned hours is exceeded",
                        ], Response::HTTP_BAD_REQUEST); //400
                    }

                    if (($nuevasHorasAmbiente > $limiteHorasAmbiente) || ($disponibilidadAmbiente - $nuevasHorasAmbiente < 0)) {

                        //Cancelar
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El ambiente '{$numeroAmbiente}' ha alcanzado el límite de horas permitido: '{$limiteHorasAmbiente} horas'. Por favor, revise la cantidad de veces que dicho ambiente es asignado, considerando que dispone de '{$disponibilidadAmbiente} horas'.",
                            'error' => "The action cannot be performed. The limit of assigned hours is exceeded",
                        ], Response::HTTP_BAD_REQUEST); //400
                    }

                    if (($nuevasHorasFicha > $limiteHorasFicha) || ($disponibilidadFicha - $nuevasHorasFicha < 0)) {

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
                'message' => 'Horario Académico creado ¡Exitosamente!'
            ], Response::HTTP_CREATED); //201
        } catch (\Exception $e) {

            //Cancelar
            DB::rollBack();
            return response()->json([
                'error' => "Register Schedule Error: " . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function update(Request $request, string $idHorario)
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

            //Reiniciar las horasAsignadas de instructores, ambientes y fichas 
            Usuario::query()->update(['horasAsignadas' => 0]);
            Ambiente::query()->update(['horasAsignadas' => 0]);
            Ficha::query()->update(['horasAsignadas' => 0]);

            //Almacenar asignaciones de la ficha antes de que sean eliminadas
            $asignacionesFicha = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                ->where('horarios_academicos.idFicha', $idFicha)
                ->where('horarios_academicos.idTrimestre', $idTrimestre)
                ->get();

            // Borrar las asignaciones antiguas
            Asignacion::where('idHorarioAcademico', $idHorario)->delete();

            // Buscar el horario académico existente
            $horarioAcademico = HorarioAcademico::findOrFail($idHorario);

            $estadoActual = $horarioAcademico->estado;

            $horarioAcademico->update([
                'estado' => strval($estadoActual),
                'idFicha' => intval($idFicha),
                'idTrimestre' => intval($idTrimestre),
            ]);

            $asignaciones = [];
            $horasAntesInstructores = [];
            $horasAntesAmbientes = [];
            $horasAntesFicha = $asignacionesFicha->count();

            foreach ($globalStoreBoxes as $box) {
                $boxIndex = intval($box['boxIndex']);
                $idInstructor = intval($box['idInstructor']);
                $idAmbiente = intval($box['idAmbiente']);

                //Obtener cantidad de horas asignadas hasta el momento
                $asignacionesInstructor = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('asignaciones.idUsuario', $idInstructor)
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->get();
                $asignacionesAmbiente = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->where('asignaciones.idAmbiente', $idAmbiente)
                    ->where('horarios_academicos.idTrimestre', $idTrimestre)
                    ->get();

                // Log::info($asignacionesInstructor);
                // Log::info($asignacionesAmbiente);
                // Log::info($asignacionesFicha);

                // Obtener las horas antes solo si aún no se han obtenido antes para dicho [instructor]
                if (!isset($horasAntesInstructores[$idInstructor])) {
                    $horasAntesInstructores[$idInstructor] = $asignacionesInstructor->count();
                }
                // Obtener las horas antes solo si aún no se han obtenido antes para dicho [ambiente]
                if (!isset($horasAntesAmbientes[$idAmbiente])) {
                    $horasAntesAmbientes[$idAmbiente] = $asignacionesAmbiente->count();
                }

                $nombreInstructor = Usuario::where('idUsuario', $idInstructor)->value('nombreCompleto');
                $numeroAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('ambiente');
                $numeroFicha = Ficha::where('idFicha', $idFicha)->value('ficha');

                // Obtener el límite de horas para el instructor, ambiente y ficha
                $limiteHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('limiteHoras');
                $limiteHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('limiteHoras');
                $limiteHorasFicha = Ficha::where('idFicha', $idFicha)->value('limiteHoras');

                $disponibilidadInstructor = $limiteHorasInstructor - $horasAntesInstructores[$idInstructor];
                $disponibilidadAmbiente = $limiteHorasAmbiente - $horasAntesAmbientes[$idAmbiente];
                $disponibilidadFicha = $limiteHorasFicha - $horasAntesFicha;


                // Log::info($horasAntesFicha);
                // Log::info($horasAntesAmbientes[$idAmbiente]);
                // Log::info($horasAntesInstructores[$idInstructor]);
                // Log::info($disponibilidadFicha);
                // Log::info($disponibilidadAmbiente);
                // Log::info($disponibilidadInstructor);


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
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->where('asignaciones.idUsuario', $idInstructor)
                    ->where('asignaciones.boxIndex', $boxIndex)
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->select('fichas.ficha')
                    ->first();
                $fichaAsignadaAmbiente = Asignacion::join('horarios_academicos', 'asignaciones.idHorarioAcademico', '=', 'horarios_academicos.idHorario')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('trimestres', 'horarios_academicos.idTrimestre', '=', 'trimestres.idTrimestre')
                    ->where('asignaciones.idAmbiente', $idAmbiente)
                    ->where('asignaciones.boxIndex', $boxIndex)
                    ->where('trimestres.idTrimestre', $idTrimestre)
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
                    }
                }

                if ($limiteHorasInstructor !== null && $limiteHorasAmbiente !== null) {

                    $nuevasHorasInstructor = Usuario::where('idUsuario', $idInstructor)->value('horasAsignadas') + 1;
                    $nuevasHorasAmbiente = Ambiente::where('idAmbiente', $idAmbiente)->value('horasAsignadas') + 1;
                    $nuevasHorasFicha = Ficha::where('idFicha', $idFicha)->value('horasAsignadas') + 1;

                    if (($nuevasHorasInstructor > $limiteHorasInstructor)) {

                        // Si el incremento supera el límite: 
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El instructor '{$nombreInstructor}' ha alcanzado el límite de horas permitido: '{$limiteHorasInstructor} horas'. Por favor, revise la cantidad de veces que dicho instructor es asignado, considerando que dispone de '{$disponibilidadInstructor} horas' para impartir formación.",
                            'error' => "The action cannot be performed. The limit of assigned hours is exceeded",
                        ], Response::HTTP_BAD_REQUEST); //400
                    }

                    if (($nuevasHorasAmbiente > $limiteHorasAmbiente)) {

                        //Cancelar
                        DB::rollBack();

                        return response()->json([
                            'status' => 0,
                            'message' => "El ambiente '{$numeroAmbiente}' ha alcanzado el límite de horas permitido: '{$limiteHorasAmbiente} horas'. Por favor, revise la cantidad de veces que dicho ambiente es asignado, considerando que dispone de '{$disponibilidadAmbiente} horas'.",
                            'error' => "The action cannot be performed. The limit of assigned hours is exceeded",
                        ], Response::HTTP_BAD_REQUEST); //400
                    }

                    if (($nuevasHorasFicha > $limiteHorasFicha)) {

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
                    'idHorarioAcademico' => $idHorario,
                ];
            }

            // Insertar las nuevas asignaciones
            Asignacion::insert($asignaciones);

            //Confirmar
            DB::commit();

            return response()->json([
                'status' => 1,
                'message' => 'Horario Académico Actualizado ¡Exitosamente!'
            ], Response::HTTP_OK); //200

        } catch (\Exception $e) {

            //Cancelar
            DB::rollBack();
            return response()->json([
                'error' => "Updated Schedule Error: " . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function scheduleEnableRecords(string $idTrimestre = null)
    {
        try {
            if ($idTrimestre == 'null' || $idTrimestre == 'undefined') {

                $lastQuarter = Trimestre::select('idTrimestre')
                    ->orderBy('idTrimestre', 'desc')
                    ->first();

                if (!$lastQuarter) {
                    return response()->json([
                        'error' => 'Quarter not found'
                    ], Response::HTTP_NOT_FOUND);
                }

                $idTrimestre = strval($lastQuarter['idTrimestre']);

                $records = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                    ->select(
                        'fichas.ficha',
                        'horarios_academicos.idHorario',
                        'fichas.idFicha',
                        'trimestres.trimestre',
                        'trimestres.idTrimestre',
                        'trimestres.fechaInicio',
                    )
                    ->where('horarios_academicos.estado', 'habilitado')
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->distinct()
                    ->get();


                if ($records->isEmpty()) {
                    return response()->json([
                        'status' => 0,
                        'error' => 'Schedule Not Found'
                    ], Response::HTTP_NOT_FOUND); //404
                }
                return response()->json($records, Response::HTTP_OK);
            }

            $records = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                ->select(
                    'fichas.ficha',
                    'horarios_academicos.idHorario',
                    'fichas.idFicha',
                    'trimestres.trimestre',
                    'trimestres.idTrimestre',
                    'trimestres.fechaInicio',
                )
                ->where('horarios_academicos.estado', 'habilitado')
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->distinct()
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


    public function scheduleDisableRecords(string $idTrimestre = null)
    {
        try {
            if ($idTrimestre == 'null' || $idTrimestre == 'undefined') {

                $lastQuarter = Trimestre::select('idTrimestre')
                    ->orderBy('idTrimestre', 'desc')
                    ->first();

                if (!$lastQuarter) {
                    return response()->json([
                        'error' => 'Quarter not found'
                    ], Response::HTTP_NOT_FOUND);
                }

                $idTrimestre = strval($lastQuarter['idTrimestre']);

                $records = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                    ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                    ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                    ->select(
                        'fichas.ficha',
                        'horarios_academicos.idHorario',
                        'fichas.idFicha',
                        'trimestres.trimestre',
                        'trimestres.idTrimestre',
                        'trimestres.fechaInicio',
                    )
                    ->where('horarios_academicos.estado', 'inhabilitado')
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->distinct()
                    ->get();

                if ($records->isEmpty()) {
                    return response()->json([
                        'status' => 0,
                        'error' => 'Schedule Not Found'
                    ], Response::HTTP_NOT_FOUND); //404
                }

                return response()->json($records, Response::HTTP_OK);
            }
            $records = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('fichas', 'horarios_academicos.idFicha', '=', 'fichas.idFicha')
                ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                ->select(
                    'fichas.ficha',
                    'horarios_academicos.idHorario',
                    'fichas.idFicha',
                    'trimestres.trimestre',
                    'trimestres.idTrimestre',
                    'trimestres.fechaInicio',
                )
                ->where('horarios_academicos.estado', 'inhabilitado')
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->distinct()
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

    public function EnableSchedulesInstructors(string $idTrimestre = null)
    {
        try {
            if ($idTrimestre == 'null' || $idTrimestre == 'undefined') {

                $lastQuarter = Trimestre::select('idTrimestre')
                    ->orderBy('idTrimestre', 'desc')
                    ->first();

                if (!$lastQuarter) {
                    return response()->json([
                        'error' => 'Quarter not found'
                    ], Response::HTTP_NOT_FOUND);
                }
                $idTrimestre = strval($lastQuarter['idTrimestre']);

                $asign = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                    ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                    ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                    ->select(
                        'usuarios.idUsuario',
                        'usuarios.nombreCompleto',
                        'trimestres.trimestre',
                        'trimestres.idTrimestre',
                        'trimestres.fechaInicio',
                    )
                    // ->where('horarios_academicos.estado', 'habilitado')
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->groupBy(
                        'usuarios.idUsuario',
                        'usuarios.nombreCompleto',
                        'trimestres.trimestre',
                        'trimestres.idTrimestre',
                        'trimestres.fechaInicio',
                    )
                    ->get();

                return response()->json($asign, Response::HTTP_OK);
            }

            $asign = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('usuarios', 'asignaciones.idUsuario', '=', 'usuarios.idUsuario')
                ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                ->select(
                    'usuarios.idUsuario',
                    'usuarios.nombreCompleto',
                    'trimestres.trimestre',
                    'trimestres.idTrimestre',
                    'trimestres.fechaInicio',
                )
                // ->where('horarios_academicos.estado', 'habilitado')
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->groupBy(
                    'usuarios.idUsuario',
                    'usuarios.nombreCompleto',
                    'trimestres.trimestre',
                    'trimestres.idTrimestre',
                    'trimestres.fechaInicio',
                )
                ->get();

            return response()->json($asign, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Schedule: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function scheduleEnableEnvironments(string $idTrimestre = null)
    {
        try {

            if ($idTrimestre == 'null' || $idTrimestre == 'undefined') {

                $lastQuarter = Trimestre::select('idTrimestre')
                    ->orderBy('idTrimestre', 'desc')
                    ->first();

                if (!$lastQuarter) {
                    return response()->json([
                        'error' => 'Quarter not found'
                    ], Response::HTTP_NOT_FOUND);
                }

                $idTrimestre = strval($lastQuarter['idTrimestre']);

                $ambientes = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                    ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                    ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                    ->select(
                        'ambientes.idAmbiente',
                        DB::raw('MAX(ambientes.ambiente) as ambiente'),
                        'trimestres.trimestre',
                        'trimestres.idTrimestre',
                        'trimestres.fechaInicio'
                    )
                    // ->where('horarios_academicos.estado', 'habilitado')
                    ->where('trimestres.idTrimestre', $idTrimestre)
                    ->groupBy(
                        'ambientes.idAmbiente',
                        'trimestres.trimestre',
                        'trimestres.idTrimestre',
                        'trimestres.fechaInicio',
                    )
                    ->get();
                return response()->json($ambientes, Response::HTTP_OK);
            }

            $ambientes = HorarioAcademico::join('asignaciones', 'horarios_academicos.idHorario', '=', 'asignaciones.idHorarioAcademico')
                ->join('ambientes', 'asignaciones.idAmbiente', '=', 'ambientes.idAmbiente')
                ->join('trimestres', 'trimestres.idTrimestre', '=', 'horarios_academicos.idTrimestre')
                ->select(
                    'ambientes.idAmbiente',
                    DB::raw('MAX(ambientes.ambiente) as ambiente'),
                    'trimestres.trimestre',
                    'trimestres.idTrimestre',
                    'trimestres.fechaInicio'
                )
                // ->where('horarios_academicos.estado', 'habilitado')
                ->where('trimestres.idTrimestre', $idTrimestre)
                ->groupBy(
                    'ambientes.idAmbiente',
                    'trimestres.trimestre',
                    'trimestres.idTrimestre',
                    'trimestres.fechaInicio',
                )
                ->get();

            return response()->json($ambientes, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Schedule: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function enable(string $idHorario)
    {
        try {
            $schedule = HorarioAcademico::findOrFail($idHorario);

            $schedule->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Horario habilitado exitosamente.'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Horario no encontrado.'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al habilitar horario ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function disable(string $idHorario)
    {
        try {
            $schedule = HorarioAcademico::findOrFail($idHorario);

            $schedule->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Horario inhabilitado exitosamente.'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Horario no encontrado.'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al habilitar horario, intentelo más tarde ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function createAndUpdateBy(string $idHorario)
    {
        $schedule = HorarioAcademico::find($idHorario);

        $userCreate = $schedule->createdBy; // Accede al usuario que creó el horario
        $userUpdate = $schedule->updatedBy; // Accede al usuario que actualizó el horario

        $response = [];

        if ($userCreate) {
            $response['status'] = 1;
            $response['userCreate'] = $userCreate->nombreCompleto;
        } else {
            $response['status'] = 0;
            $response['error'] = 'No se encontró información sobre quién creó el recurso.';
        }

        if ($userUpdate) {
            $response['status'] = 1;
            $response['userUpdate'] = $userUpdate->nombreCompleto;
        } else {
            $response['status'] = 0;
            $response['error'] = 'No se encontró información sobre quién actualizó el recurso.';
        }

        return response()->json($response);
    }

}
