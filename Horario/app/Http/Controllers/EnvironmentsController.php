<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use Illuminate\Http\Request;

class EnvironmentsController extends Controller
{
    public function index()
    {
        try{
            $environment = Ambiente::where('estado', 'habilitado')->get();
            return response()->json($environment, 200);
        }catch(\Exception $e){
            return response()->json(['error' => "Request environment error: $e"], 500);
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
