<?php

namespace App\Http\Controllers;

use App\Models\Trimestre;
use Illuminate\Http\Request;

class QuartersController extends Controller
{
    public function index()
    {
        try{
            $quarter = Trimestre::where('estado', 'habilitado')->get();
            return response()->json($quarter, 200);
        }catch(\Exception $e){
            return response()->json(['error' => "Request quarters error: $e"], 500);
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
