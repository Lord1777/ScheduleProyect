<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class InstructorController extends Controller
{
    public function getInstructors()
    {
        try {
            $instructors = Usuario::where('usuarios.estado', 'habilitado')
                ->where('usuarios.idRol', 2)
                ->get();
            return response()->json($instructors, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Instructors Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexEnabled()
    {
        try {
            $instructors = Usuario::join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
                ->select(
                    'usuarios.idUsuario',
                    'usuarios.documento',
                    'usuarios.nombreCompleto',
                    'contratos.tipoContrato',
                    'usuarios.profesion',
                )
                ->where('usuarios.estado', 'habilitado')
                ->where('usuarios.idRol', 2)
                ->paginate(15);
            return response()->json($instructors, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Instructors Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexDisable()
    {
        try {
            $instructors = Usuario::join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
                ->select(
                    'usuarios.idUsuario',
                    'usuarios.documento',
                    'usuarios.nombreCompleto',
                    'contratos.tipoContrato',
                    'usuarios.profesion',
                )
                ->where('usuarios.estado', 'inhabilitado')
                ->where('usuarios.idRol', 2)
                ->paginate(15);
            return response()->json($instructors, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Instructors Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
                ->where('idRol', 2)
                ->join('sedes', 'usuarios.idSede', '=', 'sedes.idSede')
                ->join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
                ->select('usuarios.*','sedes.sede', 'contratos.tipoContrato')
                ->firstOrFail();

            return response()->json($user, Response::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Instructor Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Getting Instructor: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $idUsuario)
    {
        $validator = Validator::make($request->all(), [
            'nombreCompleto' => 'required',
            'tipoDocumento' => 'required',
            'documento' => 'required',
            'email' => 'required',
            'telefono' => 'required',
            'idContrato' => 'required|integer',
            'ciudad' => 'required',
            'profesion' => 'required',
            'experiencia' => 'required',
            'idSede' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 0,
                'errors' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            $user = Usuario::findOrFail($idUsuario);

            $user->update([
                'nombreCompleto' => $request->nombreCompleto,
                'tipoDocumento' => $request->tipoDocumento,
                'documento' => $request->documento,
                'email' => $request->email,
                'telefono' => $request->telefono,
                'idContrato' => $request->idContrato,
                'ciudad' => $request->ciudad,
                'profesion' => $request->profesion,
                'experiencia' => $request->experiencia,
                'idSede' => $request->idSede,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Successfully Updated Environment',
            ], Response::HTTP_OK); //200

        }  catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Instructor Not Found'
            ], Response::HTTP_NOT_FOUND); //404            

        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Error Updating Environment: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function disable(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
                ->where('idRol', 2)
                ->firstOrFail();

            $user->update(['estado' => 'inhabilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Instructor Successfully Disabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Instructor Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Disable Instructor: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function enabled(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
                ->where('idRol', 2)
                ->firstOrFail();

            $user->update(['estado' => 'habilitado']);

            return response()->json([
                'status' => 1,
                'message' => 'Instructor Successfully Enabled'
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status', 0,
                'error' => 'Instructor Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Instructor: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
