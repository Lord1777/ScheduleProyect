<?php

namespace App\Http\Controllers\api;

use App\Models\Asignacion;
use App\Models\HorarioAcademico;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    public function index()
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

            foreach ($globalStoreBoxes as $box) {
                $asignaciones[] = [
                    'boxIndex' => $box['boxIndex'],
                    'idAmbiente' => intval($box['idAmbiente']),
                    'idUsuario' => intval($box['idInstructor']),
                    'idHorarioAcademico' => $horarioAcademico->idHorario,
                ];
            }

            // Insertar asignaciones en lote
            Asignacion::insert($asignaciones);

            return response()->json([
                'status' => 1,
                'message' => 'Successfully created academic schedule'
            ], Response::HTTP_CREATED); //201
        } catch (\Exception $e) {
            return response()->json([
                'error' => "Register Schedule Error: ".$e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
