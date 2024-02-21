<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
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
                'status' => 0,
                'error' => 'El documento de identidad u el nombre del usuario ya se encuentra registrado.'
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
                'sesion' => 0,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'User Created Successfully',
            ], Response::HTTP_CREATED); //201


        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
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

    public function updatePassword(Request $request)
    {
        try {
            //Log::info('Solicitud recibida para actualizar la contraseña', $request->all());

            // Validar la solicitud
            $validator = Validator::make($request->all(), [
                'idUsuario' => 'required|exists:usuarios,idUsuario',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 0,
                    'error' => $validator->errors()->first(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
            }

            // Buscar el usuario por su ID
            $user = Usuario::find($request->idUsuario, 'idUsuario');

            if (!$user) {
                return response()->json([
                    'status' => 0,
                    'error' => 'Usuario no encontrado.',
                ], Response::HTTP_NOT_FOUND); //404
            }

            // Actualizar la contraseña
            $user->password = Hash::make($request->password);
            $user->sesion = 1;
            $user->save();

            // Log de éxito
            //Log::info('Contraseña actualizada correctamente');

            return response()->json([
                'status' => 1,
                'message' => 'Contraseña fue actualizada correctamente.',
            ]);
        } catch (\Exception $e) {
            // Log de error
            //Log::error('Error al actualizar la contraseña: ' . $e->getMessage());

            return response()->json([
                "status" => 0,
                "message" => "Error al actualizar la contraseña.",
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)])
            : response()->json(['error' => __($status)], 400);
    }

    public function showResetForm(Request $request, $token)
    {
        return Response::json([
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset($request->only(
            'email',
            'password',
            'password_confirmation',
            'token'
        ), function ($user, $password) {
            $user->forceFill([
                'password' => bcrypt($password)
            ])->save();
        });

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Contraseña restablecida correctamente'])
            : response()->json(['error' => 'Error al restablecer la contraseña'], 400);
    }
}
