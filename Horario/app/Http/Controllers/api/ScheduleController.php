<?php

namespace App\Http\Controllers;

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
            'estado' => 'Activo',
        ]);

        foreach ($globalStoreBoxes as $box) {
            $boxIndex = $box['boxIndex'];
            $instructor = $box['instructor'];
            $ambiente = $box['ambiente'];

            

            // Crear una nueva asignación para cada caja
            // Asignacion::create([
            //     'boxIndex' => $boxIndex,
            //     'idFicha' => $tuValo, // Ajusta esto según tus necesidades
            //     'idAmbiente' => $tuValor, // Ajusta esto según tus necesidades
            //     'idUsuario' => $tuValor, // Ajusta esto según tus necesidades
            //     'idTrimestre' => $trimestre,
            //     'idHorarioAcademico' => $horarioAcademico->idHorario,
            // ]);

            // También puedes considerar guardar la relación con otras tablas como 'fichas', 'ambientes', etc.
        }
    }
}
