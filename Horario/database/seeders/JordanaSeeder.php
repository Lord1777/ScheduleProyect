<?php

namespace Database\Seeders;

use App\Models\Jornada;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JordanaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jornada1 = new Jornada();
        $jornada1->jornada = 'diurna';
        $jornada1->estado = 'habilitado';
        $jornada1->save();

        $jornada2 = new Jornada();
        $jornada2->jornada = 'nocturna';
        $jornada2->estado = 'habilitado';
        $jornada2->save();
    }
}
