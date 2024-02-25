<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class InstructorController extends Controller
{
    public function getInstructors()
    {
        try {
            $instructors = Usuario::where('usuarios.estado', 'habilitado')
                ->where('usuarios.idRol', 2)
                ->whereColumn('limiteHoras', '!=', 'horasAsignadas')
                ->get();
            return response()->json($instructors, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Instructors Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexEnabled(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $instructors = Usuario::join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
                ->select(
                    'usuarios.idUsuario',
                    'usuarios.documento',
                    'usuarios.nombreCompleto',
                    'usuarios.email',
                    'contratos.tipoContrato',
                    'usuarios.profesion',
                    'usuarios.estado',
                    'usuarios.experiencia'
                )
                ->where('usuarios.estado', 'habilitado')
                ->where('usuarios.idRol', 2)
                ->where(function ($query) use ($search) {
                    //Lógica de búsqueda aquí
                    $query->where('documento', 'like', '%' . $search . '%')
                        ->orWhere('nombreCompleto', 'like', '%' . $search . '%');
                })
                ->paginate(15);
            return response()->json($instructors, Response::HTTP_OK); //200

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request Instructors Error: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexDisable(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $instructors = Usuario::join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
                ->select(
                    'usuarios.idUsuario',
                    'usuarios.documento',
                    'usuarios.nombreCompleto',
                    'usuarios.email',
                    'contratos.tipoContrato',
                    'usuarios.profesion',
                    'usuarios.estado',
                    'usuarios.experiencia'
                )
                ->where('usuarios.estado', 'inhabilitado')
                ->where('usuarios.idRol', 2)
                ->where(function ($query) use ($search) {
                    //Lógica de búsqueda aquí
                    $query->where('documento', 'like', '%' . $search . '%')
                        ->orWhere('nombreCompleto', 'like', '%' . $search . '%');
                })
                ->paginate(15);
                Log::info($instructors);
                
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
            'nombreCompleto' => 'required|unique:usuarios,nombreCompleto,'.$idUsuario.',idUsuario',
            'tipoDocumento' => 'required',
            'documento' => 'required|unique:usuarios,documento,'.$idUsuario.',idUsuario',
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
                'error' => 'El documento de identidad u el nombre del usuario ya se encuentra registrado.'
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
                'message' => 'Successfully Updated Instructor',
            ], Response::HTTP_OK); //200

        }  catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Instructor Not Found'
            ], Response::HTTP_NOT_FOUND); //404            

        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
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
