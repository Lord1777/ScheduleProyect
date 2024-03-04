<?php

namespace Database\Seeders;

use App\Models\NivelDeFormacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NivelDeFormacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nivel1 = new NivelDeFormacion();
        $nivel1->nivel = 'tecnico';
        $nivel1->estado = 'habilitado';
        $nivel1->save();

        $nivel2 = new NivelDeFormacion();
        $nivel2->nivel = 'tecnologo';
        $nivel2->estado = 'habilitado';
        $nivel2->save();
    }
}
