<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use stdClass;


class AuthController extends Controller
{
    //Metodo para registrar usuarios nuevos
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'documento' => 'required|unique:usuarios',
            'idContrato' => 'required|exists:contratos,idContrato',
            'idSede' => 'required|exists:sedes,idSede',
            'idRol' => 'required|exists:roles,idRol',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        try {
            Usuario::create([
                'tipoDeDocumento' => $request->tipoDeDocumento,
                'documento' => $request->documento,
                'nombreCompleto' => $request->nombreCompleto,
                'ciudad' => $request->ciudad,
                'telefono' => $request->telefono,
                'profesion' => $request->profesion,
                'email' => $request->email,
                'experiencia' => $request->experiencia,
                'contraseña' => strval($request->documento),
                'limiteHoras' => $request->limiteHoras,
                'horasAsignadas' => 0,
                'estado' => 'habilitado',
                'idContrato' => $request->idContrato,
                'idSede' => $request->idSede,
                'idRol' => $request->idRol,
            ]);

            return response()->json(['message' => 'User Created Successfully'], Response::HTTP_CREATED);
            // $token = $user->createToken('auth_token')->plainTextToken;

            // return response()
            //     ->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer',]);

        } catch (\Exception $e) {
            return response()->json(['error' => "Register Instructor Error: $e"], 500);
        }
    }
}
