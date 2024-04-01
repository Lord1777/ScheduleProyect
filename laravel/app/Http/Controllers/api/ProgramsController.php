<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Programa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProgramsController extends Controller
{
    public function getPrograms()
    {
        try{
            $programa = Programa::where('estado', 'habilitado')->get();
            return response()->json($programa, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Program Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexEnabled(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $programa = Programa::join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->select(
                    'programas.idPrograma',
                    'programas.nombre',
                    'programas.duracion',
                    'niveles_de_formacion.nivel'
                )
                ->where('programas.estado', 'habilitado')
                ->where(function ($query) use ($search) {
                    //Lógica de búsqueda aquí
                    $query->where('nombre', 'like', '%' . $search . '%');
                })
                ->orderBy('idPrograma', 'desc')
                ->paginate(30);
            return response()->json($programa, Response::HTTP_OK); //200;
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Programs Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexDisable(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $programa = Programa::join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->select(
                    'programas.idPrograma',
                    'programas.nombre',
                    'programas.duracion',
                    'niveles_de_formacion.nivel'
                )
                ->where('programas.estado', 'inhabilitado')
                ->where(function ($query) use ($search) {
                    //Lógica de búsqueda aquí
                    $query->where('nombre', 'like', '%' . $search . '%');
                })
                ->orderBy('idPrograma', 'desc')
                ->paginate(30);
            return response()->json($programa, Response::HTTP_OK); //200;
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Programs Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idPrograma){
        try {
            $programa = Programa::join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
        ->select(
            'programas.idPrograma',
            'programas.nombre',
            'programas.duracion',
            'programas.idNivelFormacion',
            'niveles_de_formacion.nivel'
        )
        ->findOrFail($idPrograma);

            return response()->json($programa, Response::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Program Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Program: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $idPrograma)
    {

        $nombre = $request->nombre;

        $validator = Validator::make($request->all(), [
            'duracion' => 'required|numeric',
            'nombre' => 'required|string|unique:programas,nombre,' . $nombre . ',nombre',
            'idNivelFormacion' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'error' => "El programa de formación ($request->nombre) ya se encuentra registrado."
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            $programa = Programa::findOrFail($idPrograma);

            $programa->update([
                'nombre' => strval($request->nombre),
                'duracion' => intval($request->duracion),
                'idNivelFormacion' => intval($request->idNivelFormacion),
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Successfully Updated Ficha',
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Ficha Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'duracion' => 'required|numeric',
            'nombre' => 'required|string|unique:programas',
            'idNivelFormacion' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'error' => "El programa de formación ($request->nombre) ya se encuentra registrado."
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            Programa::create([
                'nombre' => strval($request->nombre),
                'duracion' => intval($request->duracion),
                'estado' => 'habilitado',
                'idNivelFormacion' => intval($request->idNivelFormacion),
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Create Program Succesfully',
            ], Response::HTTP_CREATED); //201

        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function enabled(string $idPrograma)
    {
        try {
            $program = Programa::findOrFail($idPrograma);

            $program->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Program Successfully enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Program Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error enable Program: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function disable(string $idPrograma)
    {
        try {
            $program = Programa::findOrFail($idPrograma);

            $program->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Program Successfully disabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Program Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error disable Program: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
