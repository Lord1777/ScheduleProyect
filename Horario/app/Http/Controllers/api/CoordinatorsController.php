<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CoordinatorsController extends Controller
{
    public function index()
    {
        try{
            $coordinators = Usuario::where('idRol', 1)->where('estado', 'habilitado')->get();
            return response()->json($coordinators, Response::HTTP_OK);

        }catch(\Exception $e){
            return response()->json(['error' => "Request coordinator error: $e"], 500);
        }

    }

    public function show(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
            ->where('idRol', 1)
            ->firstOrFail();

            return response()->json($user, Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Coordinator Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Coordinator: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update()
    {
    }

    public function disable(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
            ->where('idRol', 1)
            ->firstOrFail();

            $user->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Coordinator Successfully Disabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Coordinator Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Disable Coordinator: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function enabled(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
            ->where('idRol', 1)
            ->firstOrFail();

            $user->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Coordinator Successfully Enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Coordinator Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Coordinator: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
