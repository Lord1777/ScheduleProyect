<?php

namespace App\Http\Controllers\api;

use App\Models\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RecordsController extends Controller
{
    public function index()
    {
        try {
            $records = Ficha::with('programa.nivel', 'programa.modalidad', 'programa.jornada')->get();
            return response()->json($records, 200);

        } catch (\Exception $e) {
            return response()->json(['error' => "Request records error: $e"], 500);
        }
    }

    public function store(Request $request)
    {
        $record = new Ficha;
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}
