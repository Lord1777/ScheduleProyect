<?php

namespace Database\Seeders;

use App\Models\Contrato;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContratoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contrato1 = new Contrato;
        $contrato1->tipoContrato = 'planta';
        $contrato1->save();

        $contrato2 = new Contrato;
        $contrato2->tipoContrato = 'contratista';
        $contrato2->save();
    }
}
