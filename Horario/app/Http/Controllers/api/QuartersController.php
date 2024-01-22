<?php

namespace App\Http\Controllers\api;

use App\Models\Trimestre;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use PhpParser\Node\Stmt\TryCatch;

class QuartersController extends Controller
{
    public function indexEnabled()
    {
        try {
            $quarter = Trimestre::where('estado', 'habilitado')->paginate(15);
            return response()->json($quarter, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request quarters error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexDisable()
    {
        try {
            $quarter = Trimestre::where('estado', 'inhabilitado')->paginate(15);
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
            return response()->json(['error' => "Request quarters error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function update()
    {
    }

    public function enabled(string $idTrimestre)
    {
        try{
            $quarter = Trimestre::findOrFail($idTrimestre);

            $quarter->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Quarter Successfully Enabled'
            ], Response::HTTP_OK); //200
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json([
                'status' => 0,
                'error' => 'Quarter Not Found'
            ], Response::HTTP_NOT_FOUND); //404
        } catch(\Exception $e){
            return response()->json([
                'error' => 'Error Enabled Quarter: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function disable(string $idTrimestre)
    {
        try{
            $quarter = Trimestre::findOrFail($idTrimestre);

            $quarter->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Quarter Successfully Enabled'
            ], Response::HTTP_OK); //200
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json([
                'status' => 0,
                'error' => 'Quarter Not Found'
            ], Response::HTTP_NOT_FOUND); //404
        } catch(\Exception $e){
            return response()->json([
                'error' => 'Error Enabled Quarter: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }   
}
