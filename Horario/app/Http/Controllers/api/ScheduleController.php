<?php

namespace App\Http\Controllers\api;

use App\Models\Asignacion;
use App\Models\HorarioAcademico;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;


class ScheduleController extends Controller
{
    public function index()
    {

    }

    public function store(Request $request)
    {
        $data = $request->json()->all();
        $trimestre = $data['trimestre'];
        $globalStoreBoxes = $data['globalStoreBoxes'];

        // Crear un nuevo horario académico
        $horarioAcademico = HorarioAcademico::create([
            'estado' => 'habilitado',
            // 'idFicha' => ,
            'idTrimestre' => $trimestre,
        ]);

        foreach ($globalStoreBoxes as $box) {
            $boxIndex = $box['boxIndex'];
            $instructor = $box['idInstructor'];
            $ambiente = $box['idAmbiente'];

            

            // Crear una nueva asignación para cada caja
            // Asignacion::create([
            //     'boxIndex' => $boxIndex,
            //     'idAmbiente' => $tuValor, 
            //     'idUsuario' => $tuValor, 
            //     'idHorarioAcademico' => $horarioAcademico->idHorario,
            // ]);

            // También puedes considerar guardar la relación con otras tablas como 'fichas', 'ambientes', etc.
        }
    }
}
