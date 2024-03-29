<?php

namespace App\Http\Controllers\api;

use App\Models\Ambiente;
use App\Models\Sede;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class EnvironmentsController extends Controller
{
    public function getEnvironments()
    {
        try {
            $environment = Ambiente::where('estado', 'habilitado')->get();
            return response()->json($environment, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request environment error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }


    public function indexEnabled(Request $request)
    {
        try {
            $search = $request->input('search', '');  // Obtener el parámetro de búsqueda desde la solicitud
            $environment = Ambiente::join('sedes', 'ambientes.idSede', '=', 'sedes.idSede')
                ->select(
                    'ambientes.idAmbiente',
                    'ambientes.ambiente',
                    'ambientes.capacidad',
                    'sedes.sede',
                )
                ->where('ambientes.estado', 'habilitado')
                ->where(function ($query) use ($search) {
                    // Lógica de búsqueda 
                    $query->where('ambientes.ambiente', 'like', '%' . $search . '%');
                })
                ->orderBy('idAmbiente', 'desc')
                ->paginate(30);

            return response()->json($environment, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request environment error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function indexDisable()
    {
        try {

            $environment = Ambiente::join('sedes', 'ambientes.idSede', '=', 'sedes.idSede')
                ->select(
                    'ambientes.idAmbiente',
                    'ambientes.ambiente',
                    'ambientes.capacidad',
                    'sedes.sede',
                )
                ->where('ambientes.estado', 'inhabilitado')
                ->orderBy('idAmbiente', 'desc')
                ->paginate(30);

            return response()->json($environment, Response::HTTP_OK); //200
        } catch (\Exception $e) {
            return response()->json(['error' => "Request environment error: $e"], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ambiente' => 'required|unique:ambientes',
            'aireAcondicionado' => 'required|boolean',
            'videoBeam' => 'required|boolean',
            'tablero' => 'required|boolean',
            'idSede' => 'required|exists:sedes,idSede',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'error' => "El ambiente $request->ambiente ya se encuentra registrado."
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {
            Ambiente::create([
                'ambiente' => intval($request->ambiente),
                'capacidad' => intval($request->capacidad),
                'cantidadMesas' => intval($request->cantidadMesas),
                'aireAcondicionado' => boolval($request->aireAcondicionado),
                'videoBeam' => boolval($request->videoBeam),
                'tablero' => boolval($request->tablero),
                'cantidadComputadores' => intval($request->cantidadComputadores),
                'limiteHoras' => 96,
                'horasAsignadas' => 0,
                'estado' => 'habilitado',
                'idSede' => $request->idSede,
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Successfully Created Environment',
            ], Response::HTTP_CREATED); //201

        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }

    public function show(string $idAmbiente)
    {
        try {
            $ambiente = Ambiente::join('sedes', 'ambientes.idSede', '=', 'sedes.idSede')
                ->select('ambientes.*', 'sedes.sede')
                ->findOrFail($idAmbiente);

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


    public function update(Request $request, string $idAmbiente)
    {
        $validator = Validator::make($request->all(), [
            'ambiente' => 'required|unique:ambientes,ambiente,' . $idAmbiente . ',idAmbiente',
            'aireAcondicionado' => 'required|boolean',
            'videoBeam' => 'required|boolean',
            'tablero' => 'required|boolean',
            'idSede' => 'required|exists:sedes,idSede',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'error' => "El ambiente $request->ambiente ya se encuentra registrado."
            ], Response::HTTP_UNPROCESSABLE_ENTITY); //422
        }

        try {

            $ambiente = Ambiente::findOrFail($idAmbiente);

            $ambiente->update([
                'ambiente' => intval($request->ambiente),
                'capacidad' => intval($request->capacidad),
                'cantidadMesas' => intval($request->cantidadMesas),
                'aireAcondicionado' => boolval($request->aireAcondicionado),
                'videoBeam' => boolval($request->videoBeam),
                'tablero' => boolval($request->tablero),
                'cantidadComputadores' => intval($request->cantidadComputadores),
                'idSede' => $request->idSede,
            ]);

            //Log::info('resultado: '.$ambiente);

            return response()->json([
                'status' => 1,
                'message' => 'Successfully Updated Environment',
            ], Response::HTTP_OK); //200

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 0,
                'error' => 'Environment Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
            return response()->json([
                'staus' => 0,
                'error' => "Error a registrar la informacion, por favor intentelo mas tarde."
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
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
                'status',
                0,
                'error' => 'Environment Not Found'
            ], Response::HTTP_NOT_FOUND); //404

        } catch (\Exception $e) {
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

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error Enabled Environment: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); //500
        }
    }
}
