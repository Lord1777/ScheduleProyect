<?php

namespace App\Http\Controllers;

use App\Models\Ficha;
use Illuminate\Http\Request;

class RecordsController extends Controller
{
    public function index()
    {
        try {
            $records = Ficha::where('estado', 'habilitado')->get();
            return response()->json($records, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Request records error: $e"], 500);
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
