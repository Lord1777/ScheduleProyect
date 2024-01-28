<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Programa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ProgramsController extends Controller
{
    public function indexEnabled()
    {
    }

    public function indexDisable()
    {
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'duracion' => 'required|number',
            'nombre' => 'required|string',
            'idNivelFormacion' => 'required|number'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            Programa::create([
                'nombre' => strval($request->nombre),
                'duracion' => intval($request->duracion),
                'estado' => 'habilitado',
                'idNivelFormacion' => $request->idNivelFormacion,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Create Program Succesfully',
            ], Response::HTTP_CREATED); //201

        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Request Instructors Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
