<?php

namespace App\Http\Controllers\api;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InstructorController extends Controller
{
    public function index()
    {
        try 
        {
            $instructors = Usuario::join('contratos', 'usuarios.idContrato', '=', 'contratos.idContrato')
            ->select(
                'usuarios.documento',
                'usuarios.nombreCompleto',
                'contratos.tipoContrato',
                'usuarios.profesion',
                )
            ->where('usuarios.estado', 'habilitado')
            ->where('usuarios.idRol', 2)
            ->get();
            return response()->json($instructors, 200);

        } catch (\Exception $e) 
        {
            return response()->json(['error' => "Request instructors error: $e"], 500);
        }
    }

    public function store()
    {
    }

    public function update()
    {
    }

    public function destroy(string $id)
    {
        $instructor = Usuario::destroy($id);
        return response()->json($instructor, 200);
    }
}
