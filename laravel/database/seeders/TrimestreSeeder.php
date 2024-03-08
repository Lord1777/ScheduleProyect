<?php

namespace Database\Seeders;

use App\Models\Trimestre;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrimestreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trimestre1 = new Trimestre();
        $trimestre1->trimestre = 1;
        $trimestre1->fechaInicio = Carbon::now(); // Fecha actual
        $trimestre1->fechaFinal = Carbon::now()->addMonths(3); // Fecha actual + 3 meses
        $trimestre1->estado = 'habilitado';
        $trimestre1->save();

        $trimestre2 = new Trimestre();
        $trimestre2->trimestre = 2;
        $trimestre2->fechaInicio = Carbon::now()->addMonths(3)->addDays(1); // Fecha actual + 3 meses y 1 día
        $trimestre2->fechaFinal = Carbon::now()->addMonths(6); // Fecha actual + 6 meses
        $trimestre2->estado = 'habilitado';
        $trimestre2->save();

        $trimestre3 = new Trimestre();
        $trimestre3->trimestre = 3;
        $trimestre3->fechaInicio = Carbon::now()->addMonths(6)->addDays(1);
        $trimestre3->fechaFinal = Carbon::now()->addMonths(9);
        $trimestre3->estado = 'habilitado';
        $trimestre3->save();

        $trimestre4 = new Trimestre();
        $trimestre4->trimestre = 4;
        $trimestre4->fechaInicio = Carbon::now()->addMonths(9)->addDays(1);
        $trimestre4->fechaFinal = Carbon::now()->addMonths(12);
        $trimestre4->estado = 'habilitado';
        $trimestre4->save();

        $trimestre4 = new Trimestre();
        $trimestre4->trimestre = 3;
        $trimestre4->fechaInicio = Carbon::now()->addMonths(12)->addDays(1);
        $trimestre4->fechaFinal = Carbon::now()->addMonths(15);
        $trimestre4->estado = 'inhabilitado';
        $trimestre4->save();
    }
}
