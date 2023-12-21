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
        $trimestre1->fechaInicio = Carbon::parse('24-01-2024');
        $trimestre1->fechaFinal = Carbon::parse('30-03-2024');
        $trimestre1->save();

        $trimestre2 = new Trimestre();
        $trimestre2->trimestre = 2;
        $trimestre2->fechaInicio = Carbon::parse('05-04-2024');
        $trimestre2->fechaFinal = Carbon::parse('30-06-2024');
        $trimestre2->save();

        $trimestre3 = new Trimestre();
        $trimestre3->trimestre = 3;
        $trimestre3->fechaInicio = Carbon::parse('01-07-2024');
        $trimestre3->fechaFinal = Carbon::parse('29-09-2024');
        $trimestre3->save();

        $trimestre4 = new Trimestre();
        $trimestre4->trimestre = 4;
        $trimestre4->fechaInicio = Carbon::parse('02-10-2024');
        $trimestre4->fechaFinal = Carbon::parse('15-12-2024');
        $trimestre4->save();

    }
}
