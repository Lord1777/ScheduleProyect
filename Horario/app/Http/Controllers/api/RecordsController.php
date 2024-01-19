<?php

namespace App\Http\Controllers\api;

use App\Models\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class RecordsController extends Controller
{
    public function indexEnabled()
    {
        try {
            $records = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
            ->join('modalidades', 'programas.idModalidad', '=', 'modalidades.idModalidad')
            ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
            ->join('jornadas', 'programas.idJornada', '=', 'jornadas.idJornada')
            ->select(
                'fichas.ficha',
                'programas.nombre',
                'niveles_de_formacion.nivel',
                'jornadas.jornada',
                'modalidades.modalidad'
            )
            ->where('fichas.estado', 'habilitado')
            ->paginate(15);
            return response()->json($records, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json(['error' => "Request records error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexDisable()
    {
        try {
            $records = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
            ->join('modalidades', 'programas.idModalidad', '=', 'modalidades.idModalidad')
            ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
            ->join('jornadas', 'programas.idJornada', '=', 'jornadas.idJornada')
            ->select(
                'fichas.ficha',
                'programas.nombre',
                'niveles_de_formacion.nivel',
                'jornadas.jornada',
                'modalidades.modalidad'
            )
            ->where('fichas.estado', 'inhabilitado')
            ->paginate(15);
            return response()->json($records, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json(['error' => "Request records error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function store(Request $request)
    {
        
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
