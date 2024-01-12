<?php

namespace App\Http\Controllers\api;

use App\Models\Ambiente;
use App\Models\Sede;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class EnvironmentsController extends Controller
{
    public function index()
    {
        try {

            $environment = Ambiente::join('sedes', 'ambientes.idSede', '=', 'sedes.idSede')
                ->select(
                    'ambientes.ambiente',
                    'ambientes.capacidad',
                    'sedes.sede',
                )
                ->where('ambientes.estado', 'habilitado')
                ->get();

            return response()->json($environment, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request environment error: $e"], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ambiente' => 'required',
            'capacidad' => 'required|numeric',
            'idSede' => 'required|exists:sedes,idSede',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'errors' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        $environment = new Ambiente();

        $environment->ambiente = $request->ambiente;
        $environment->capacidad = $request->capacidad;
        $environment->cantidadMesas = $request->cantidadMesas;
        $environment->aireAcondicionado = $request->aireAcondicionado;
        $environment->videoBeam = $request->videoBeam;
        $environment->tablero = $request->tablero;
        $environment->cantidadComputadores = $request->cantidadComputadores;
        $environment->limiteHoras = '96';
        $environment->horasAsignadas = '0';
        $environment->estado = 'habilitado';

        try{
            $idSede = $request->idSede;
            $sede = Sede::findOrFail($idSede);
    
            // Asociar el nuevo ambiente a la sede
            $sede->ambientes()->save($environment);

            return response()->json([
                'status' => 1,
                'message' => 'Successfully Created Environment',
            ], Response::HTTP_CREATED); //201

        }catch(\Exception $e){
            return response()->json([
                'error' => 'Error Creating Environment: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idAmbiente)
    {
        try {
            $ambiente = Ambiente::findOrFail($idAmbiente);
            return response()->json($ambiente, Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Environment Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Environment: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update()
    {
    }

    public function disable(string $idAmbiente)
    {
        try {
            $ambiente = Ambiente::findOrFail($idAmbiente);

            $ambiente->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Environment Successfully Disabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Environment Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Disable Environment: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function enabled(string $idAmbiente)
    {
        try {
            $ambiente = Ambiente::findOrFail($idAmbiente);

            $ambiente->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Environment Successfully Enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Environment Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Environment: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
