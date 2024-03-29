<?php

namespace App\Http\Controllers\api;

use App\Models\Trimestre;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class QuartersController extends Controller
{
    public function getQuarters()
    {
        try {
            $quarter = Trimestre::where('estado', 'habilitado')
                ->orderBy('fechaInicio', 'asc')
                ->get();
            return response()->json($quarter, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request quarters error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function getQuartersSchedule(string $idFicha)
    {
        try {
            $quarters = Trimestre::whereNotExists(function ($query) use ($idFicha) {
                $query->select(DB::raw(1))
                    ->from('horarios_academicos')
                    ->whereRaw('horarios_academicos.idTrimestre = trimestres.idTrimestre')
                    ->where('horarios_academicos.idFicha', '=', $idFicha)
                    ->where('horarios_academicos.estado', 'habilitado');
            })
                ->where('estado', 'habilitado')
                ->orderBy('fechaInicio', 'asc')
                ->get();

            return response()->json($quarters, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Error al solicitar los trimestres: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }

    }


    public function indexEnabled(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $quarter = Trimestre::where('estado', 'habilitado')
                ->where(function ($query) use ($search) {
                    // Lógica de búsqueda 
                    $query->where('trimestres.fechaInicio', 'like', '%' . $search . '%');
                })
                ->orderBy('fechaInicio', 'desc')
                ->paginate(15);

            return response()->json($quarter, Response::HTTP_OK); // 200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request quarters error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); // 500
        }
    }


    public function indexDisable(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $quarter = Trimestre::where('estado', 'inhabilitado')
                ->where(function ($query) use ($search) {
                    // Lógica de búsqueda 
                    $query->where('trimestres.fechaInicio', 'like', '%' . $search . '%');
                })
                ->orderBy('fechaInicio', 'desc')
                ->paginate(15);
            return response()->json($quarter, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request quarters error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function store(Request $request)
    {
        try {
            $quarter = new Trimestre();

            $quarter->trimestre = intval($request->trimestre);
            $quarter->fechaInicio = Carbon::parse($request->fechaInicio)->format('Y-m-d');
            $quarter->fechaFinal = Carbon::parse($request->fechaFinal)->format('Y-m-d');
            $quarter->estado = 'habilitado';

            $quarter->save();


            return response()->json(['message' => 'Resource created successfully'], Response::HTTP_CREATED); //201
        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idTrimestre)
    {
        try {
            $quarter = Trimestre::findOrFail($idTrimestre);

            return response()->json($quarter, Response::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Trimestre Not Found'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Trimester: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $idTrimestre)
    {
        $validator = Validator::make($request->all(), [
            'fechaInicio' => 'required',
            'fechaFinal' => 'required',
            'trimestre' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'errors' => 'Invalid date format or missing dates in the request.'
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            $quarter = Trimestre::findOrFail($idTrimestre);


            $fechaInicio = Carbon::parse($request->fechaInicio)->format('Y-m-d');
            $fechaFinal = Carbon::parse($request->fechaFinal)->format('Y-m-d');

            $quarter->update([
                'trimestre' => intval($request->trimestre),
                'fechaInicio' => strval($fechaInicio),
                'fechaFinal' => strval($fechaFinal),
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Quarter Successfully Updated',
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Quarter Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Error Updating Quarter: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function enabled(string $idTrimestre)
    {
        try {
            $quarter = Trimestre::findOrFail($idTrimestre);

            $quarter->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Quarter Successfully Enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Quarter Not Found'
            ], Response::HTTP_NOT_FOUND); //404
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Quarter: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function disable(string $idTrimestre)
    {
        try {
            $quarter = Trimestre::findOrFail($idTrimestre);

            $quarter->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Quarter Successfully Enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Quarter Not Found'
            ], Response::HTTP_NOT_FOUND); //404
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Quarter: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
