<?php

namespace App\Http\Controllers\api;

use App\Models\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class RecordsController extends Controller
{
    public function indexEnabled()
    {
        try {
            $records = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('modalidades', 'fichas.idModalidad', '=', 'modalidades.idModalidad')
                ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->join('jornadas', 'fichas.idJornada', '=', 'jornadas.idJornada')
                ->select(
                    'fichas.ficha',
                    'fichas.limiteHoras',
                    'fichas.horasAsignadas',
                    'programas.nombre as programa_nombre',
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
                ->join('modalidades', 'fichas.idModalidad', '=', 'modalidades.idModalidad')
                ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->join('jornadas', 'fichas.idJornada', '=', 'jornadas.idJornada')
                ->select(
                    'fichas.ficha',
                    'fichas.limiteHoras',
                    'fichas.horasAsignadas',
                    'programas.nombre as programa_nombre',
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
        $validator = Validator::make($request->all(), [
            'ficha' => 'required|unique:fichas|numeric',
            'idPrograma' => 'required|exists:programas,idPrograma',
            'idModalidad' => 'required|exists:modalidades,idModalidad',
            'idJornada' => 'required|exists:jornadas,idJornada'
        ]);

        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try{
            Ficha::create([
                'ficha' => intval($request->ficha),
                'idPrograma' => intval($request->idPrograma),
                'idModalidad' => intval($request->idModalidad),
                'idJornada' => intval($request->idJornada),
                'estado' => 'habilitado',
                'limiteHoras' => 40,
                'horasAsignadas' => 0,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Record Created Succesfully'
            ], Response::HTTP_CREATED); //201

            
        } catch (\Exception $e) {
            return response()->json([
                'error' => "Register Record Error: $e"
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(Request $request)
    {
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
