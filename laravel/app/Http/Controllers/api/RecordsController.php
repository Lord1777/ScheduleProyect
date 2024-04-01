<?php

namespace App\Http\Controllers\api;

use App\Models\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class RecordsController extends Controller
{

    public function getRecords()
    {
        try {
            $records = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('modalidades', 'fichas.idModalidad', '=', 'modalidades.idModalidad')
                ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->join('jornadas', 'fichas.idJornada', '=', 'jornadas.idJornada')
                ->select(
                    'fichas.idFicha',
                    'fichas.ficha',
                    'fichas.limiteHoras',
                    'fichas.horasAsignadas',
                    'programas.nombre',
                    'niveles_de_formacion.nivel',
                    'jornadas.jornada',
                    'modalidades.modalidad'
                )
                ->where('fichas.estado', 'habilitado')
                ->orderBy('fichas.ficha', 'asc')
                ->get();
            return response()->json($records, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json(['error' => "Request records error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexEnabled(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $records = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('modalidades', 'fichas.idModalidad', '=', 'modalidades.idModalidad')
                ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->join('jornadas', 'fichas.idJornada', '=', 'jornadas.idJornada')
                ->select(
                    'fichas.idFicha',
                    'fichas.ficha',
                    'fichas.limiteHoras',
                    'fichas.horasAsignadas',
                    'programas.nombre',
                    'niveles_de_formacion.nivel',
                    'jornadas.jornada',
                    'modalidades.modalidad'
                )
                ->where('fichas.estado', 'habilitado')
                ->where(function ($query) use ($search) {
                    // Lógica de búsqueda 
                    $query->where('fichas.ficha', 'like', '%' . $search . '%')
                    ->orWhere('programas.nombre', 'like', '%' . $search . '%');
                })
                ->orderBy('idFicha', 'desc')
                ->paginate(30);

            return response()->json($records, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json(['error' => "Request records error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexDisable(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $records = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('modalidades', 'fichas.idModalidad', '=', 'modalidades.idModalidad')
                ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->join('jornadas', 'fichas.idJornada', '=', 'jornadas.idJornada')
                ->select(
                    'fichas.idFicha',
                    'fichas.ficha',
                    'fichas.limiteHoras',
                    'fichas.horasAsignadas',
                    'programas.nombre',
                    'niveles_de_formacion.nivel',
                    'jornadas.jornada',
                    'modalidades.modalidad'
                )
                ->where('fichas.estado', 'inhabilitado')
                ->where(function ($query) use ($search) {
                    // Lógica de búsqueda 
                    $query->where('fichas.ficha', 'like', '%' . $search . '%')
                    ->orWhere('programas.nombre', 'like', '%' . $search . '%');
                })
                ->orderBy('idFicha', 'desc')
                ->paginate(30);

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

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'error' => "La ficha ($request->ficha) ya se encuentra registrada."
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
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
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idFicha)
    {
        try {
            $record = Ficha::join('programas', 'fichas.idPrograma', '=', 'programas.idPrograma')
                ->join('modalidades', 'fichas.idModalidad', '=', 'modalidades.idModalidad')
                ->join('niveles_de_formacion', 'programas.idNivelFormacion', '=', 'niveles_de_formacion.idNivelFormacion')
                ->join('jornadas', 'fichas.idJornada', '=', 'jornadas.idJornada')

                ->select(
                    'fichas.*',
                    'programas.nombre',
                    'niveles_de_formacion.nivel',
                    'jornadas.jornada',
                    'modalidades.modalidad',
                    'programas.duracion',
                )
                ->findOrFail($idFicha);

            return response()->json($record, Response::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Record Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Record: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $idFicha)
    {
        $ficha = $request->ficha;

        $validator = Validator::make($request->all(), [
            'ficha' => 'required|numeric|unique:fichas,ficha,' . $ficha . ',ficha',
            'idModalidad' => 'required|integer', 
            'idJornada' => 'required|integer', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'error' => "La ficha ($request->ficha) ya se encuentra registrada."
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            $ficha = Ficha::findOrFail($idFicha);

            $ficha->update([
                'ficha' => intval($request->ficha),
                'idModalidad' => $request->idModalidad,
                'idJornada' => $request->idJornada,
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


    public function disable(string $idFicha){
        try {
            $record = Ficha::findOrFail($idFicha);

            $record->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Record Successfully Disabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Record Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Disable Record: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function enabled(string $idFicha){
        try {
            $record = Ficha::findOrFail($idFicha);

            $record->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Record Successfully Enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Record Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Record: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

}
