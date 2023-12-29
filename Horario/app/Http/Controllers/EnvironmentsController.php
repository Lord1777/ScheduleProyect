<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use App\Models\Sede;
use Illuminate\Http\Request;

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

            return response()->json($environment, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Request environment error: $e"], 500);
        }
    }

    public function store(Request $request)
    {
        $environment = new Ambiente();

        $environment->ambiente = $request->ambiente;
        $environment->capacidad = $request->capacidad;
        $environment->cantidadMesas = $request->cantidadMesas;
        $environment->aireAcondicionado = $request->aireAcondicionado;
        $environment->videoBeam = $request->videoBeam;
        $environment->tablero = $request->tablero;
        $environment->cantidadComputadores = $request->cantidadComputadores;
        $environment->estado = 'habilitado';

        $idSede = $request->idSede;
        $sede = Sede::findOrFail($idSede);

        // Asociar el nuevo ambiente a la sede
        $sede->ambientes()->save($environment);
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
