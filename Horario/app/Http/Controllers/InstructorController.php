<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function index()
    {
        try 
        {
            $instructors = Usuario::where('idRol', 2)->get();
            return response()->json($instructors);

        } catch (\Exception $e) 
        {
            return response()->json(['error' => 'Request instructors error', $e], 500);
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
