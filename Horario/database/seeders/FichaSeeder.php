<?php

namespace Database\Seeders;

use App\Models\Ficha;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FichaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ficha1 = new Ficha();
        $ficha1->ficha = 2560354;
        $ficha1->limiteHoras = 40;
        $ficha1->horasAsignadas = 0;
        $ficha1->idPrograma = 1;
        $ficha1->estado = 'habilitado';
        $ficha1->save();

        $ficha2 = new Ficha();
        $ficha2->ficha = 2646570;
        $ficha2->limiteHoras = 40;
        $ficha2->horasAsignadas = 0;
        $ficha2->idPrograma = 2;
        $ficha2->estado = 'habilitado';
        $ficha2->save();

        $ficha3 = new Ficha();
        $ficha3->ficha = 2454412;
        $ficha3->limiteHoras = 40;
        $ficha3->horasAsignadas = 0;
        $ficha3->idPrograma = 3;
        $ficha3->estado = 'habilitado';
        $ficha3->save();

        $ficha4 = new Ficha();
        $ficha4->ficha = 2747854;
        $ficha4->limiteHoras = 40;
        $ficha4->horasAsignadas = 0;
        $ficha4->idPrograma = 4;
        $ficha4->estado = 'habilitado';
        $ficha4->save();

        $ficha5 = new Ficha();
        $ficha5->ficha = 2561045;
        $ficha5->limiteHoras = 40;
        $ficha5->horasAsignadas = 0;
        $ficha5->idPrograma = 5;
        $ficha5->estado = 'habilitado';
        $ficha5->save();

        $ficha6 = new Ficha();
        $ficha6->ficha = 2500010;
        $ficha6->limiteHoras = 40;
        $ficha6->horasAsignadas = 0;
        $ficha6->idPrograma = 6;
        $ficha6->estado = 'habilitado';
        $ficha6->save();

        $ficha7 = new Ficha();
        $ficha7->ficha = 2661357;
        $ficha7->limiteHoras = 40;
        $ficha7->horasAsignadas = 0;
        $ficha7->idPrograma = 7;
        $ficha7->estado = 'habilitado';
        $ficha7->save();

        $ficha8 = new Ficha();
        $ficha8->ficha = 2660354;
        $ficha8->limiteHoras = 40;
        $ficha8->horasAsignadas = 0;
        $ficha8->idPrograma = 8;
        $ficha8->estado = 'habilitado';
        $ficha8->save();

        $ficha9 = new Ficha();
        $ficha9->ficha = 2760354;
        $ficha9->limiteHoras = 40;
        $ficha9->horasAsignadas = 0;
        $ficha9->idPrograma = 9;
        $ficha9->estado = 'habilitado';
        $ficha9->save();

        $ficha10 = new Ficha();
        $ficha10->ficha = 2712498;
        $ficha10->limiteHoras = 40;
        $ficha10->horasAsignadas = 0;
        $ficha10->idPrograma = 10;
        $ficha10->estado = 'habilitado';
        $ficha10->save();

    }
}
