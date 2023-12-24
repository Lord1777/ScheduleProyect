<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class CoordinatorsController extends Controller
{
    public function index()
    {
        try{
            $coordinators = Usuario::where('idRol', 1)->where('estado', 'habilitado')->get();
            return response()->json($coordinators, 200);

        }catch(\Exception $e){
            return response()->json(['error' => "Request coordinator error: $e"], 500);
        }

    }

    public function store()
    {
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
