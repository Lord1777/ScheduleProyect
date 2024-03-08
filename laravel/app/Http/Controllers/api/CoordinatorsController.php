<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CoordinatorsController extends Controller
{
    public function indexEnabled(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $coordinators = Usuario::where('idRol', 1)
                ->where('estado', 'habilitado')
                ->where(function ($query) use ($search) {
                    //Lógica de búsqueda aquí
                    $query->where('documento', 'like', '%' . $search . '%')
                        ->orWhere('nombreCompleto', 'like', '%' . $search . '%');
                })
                ->orderBy('idUsuario', 'desc')
                ->paginate(30);
    
            return response()->json($coordinators, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request coordinator error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexDisable(Request $request)
    {
        try {
            $search = $request->input('search', ''); //Obtener el parametro de búsqueda desde la solicitud
            $coordinators = Usuario::where('idRol', 1)
                ->where('estado', 'inhabilitado')
                ->where(function($query) use ($search){
                    //Lógica de busqueda
                    $query->where('documento', 'like', '%' . $search . '%')
                        ->orWhere('nombreCompleto', 'like', '%' . $search . '%');
                })
                ->orderBy('idUsuario', 'desc')
                ->paginate(30);

            return response()->json($coordinators, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request coordinator error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idUsuario)
    {
        try {
            $user = Usuario::where('idUsuario', $idUsuario)
            ->where('idRol', 1)
            ->join('sedes', 'usuarios.idSede', '=', 'sedes.idSede')
            ->join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
            ->select('usuarios.*','sedes.sede', 'contratos.tipoContrato')
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
                'message' => 'Successfully Updated Coordinator',
            ], Response::HTTP_OK); //200

        }  catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Coordinator Not Found'
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
