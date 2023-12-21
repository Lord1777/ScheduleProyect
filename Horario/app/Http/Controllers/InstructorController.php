<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function index()
    {
        $instructores = Usuario::where('idRol', 2)->get();
        return $instructores;
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
