<?php

namespace App\Http\Controllers;

use App\Models\Trimestre;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class QuartersController extends Controller
{
    public function index()
    {
        try {
            $quarter = Trimestre::where('estado', 'habilitado')->get();
            return response()->json($quarter, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Request quarters error: $e"], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $quarter = new Trimestre();

            $quarter->trimestre = $request->trimestre;
            $quarter->fechaInicio = Carbon::parse($request->fechaInicio)->format('Y-m-d');
            $quarter->fechaFinal = Carbon::parse($request->fechaFinal)->format('Y-m-d');
            $quarter->estado = 'habilitado';

            $quarter->save();

            // Devuelve una respuesta con el código 201 y un mensaje de éxito
            return response()->json(['message' => 'Resource created successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['error' => "Request quarters error: $e"], 500);
        }
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
