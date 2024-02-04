<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use stdClass;


class AuthController extends Controller
{
    //Metodo para registrar usuarios nuevos
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'documento' => 'required|unique:usuarios',
            'nombreCompleto' => 'required|unique:usuarios',
            'idContrato' => 'required|exists:contratos,idContrato',
            'idSede' => 'required|exists:sedes,idSede',
            'idRol' => 'required|exists:roles,idRol',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            Usuario::create([
                'tipoDocumento' => $request->tipoDocumento,
                'documento' => $request->documento,
                'nombreCompleto' => $request->nombreCompleto,
                'ciudad' => $request->ciudad,
                'telefono' => $request->telefono,
                'profesion' => $request->profesion,
                'email' => $request->email,
                'experiencia' => $request->experiencia,
                'password' => Hash::make(strval($request->documento)),
                'limiteHoras' => $request->limiteHoras,
                'horasAsignadas' => 0,
                'estado' => 'habilitado',
                'idContrato' => $request->idContrato,
                'idSede' => $request->idSede,
                'idRol' => $request->idRol,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'User Created Successfully',
            ], Response::HTTP_CREATED); //201
            

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Register Instructor Error: $e"
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function login(Request $request)
    {
        // Log::info('Datos de la solicitud:', $request->all());

        if (!Auth::attempt($request->only('documento', 'password'))) {
            return response([
                'message' => 'Invalid Credentials!'
            ], Response::HTTP_UNAUTHORIZED); //401
        }

        $user = Usuario::with('rol')->firstWhere('documento', $request->documento);

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'data' => $user,
                'status' => 1,
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => $user->rol->rol,
                'message' => 'Login Succesfully',
            ]);
        }

        return response()->json([
            'status' => 0,
            'message' => 'Incorrect Credentials',
        ], Response::HTTP_UNAUTHORIZED); //401
    }

    public function user()
    {
        try {
            $user = Auth::user();

            if ($user) {
                return response()->json([
                    "status" => 1,
                    "data" => $user,
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => "Unauthenticated User",
                ], Response::HTTP_UNAUTHORIZED); //401
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Error Getting User",
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function logout()
    {
        try {
            $user = auth()->user();

            if ($user) {
                $user->tokens()->delete();

                return response()->json([
                    "status" => 1,
                    "message" => "Successful Logout",
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => "Unauthenticated User",
                ], Response::HTTP_UNAUTHORIZED); //401
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Logout Error",
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
