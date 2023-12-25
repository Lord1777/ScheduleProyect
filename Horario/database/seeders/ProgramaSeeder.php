<?php

namespace Database\Seeders;

use App\Models\Programa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programa1 = new Programa();
        $programa1->nombre = 'analisis y desarrollo de software';
        $programa1->duracion = 3360;
        $programa1->idModalidad = 2;
        $programa1->idJornada = 1;
        $programa1->idNivelFormacion = 2;
        $programa1->estado = 'habilitado';
        $programa1->save();

        $programa2 = new Programa();
        $programa2->nombre = 'analisis y desarrollo de sistemas de informacion';
        $programa2->duracion = 3390;
        $programa2->idModalidad = 2;
        $programa2->idJornada = 1;
        $programa2->idNivelFormacion = 2;
        $programa2->estado = 'habilitado';
        $programa2->save();

        $programa3 = new Programa();
        $programa3->nombre = 'infraestructura de edificios';
        $programa3->duracion = 2800;
        $programa3->idModalidad = 1;
        $programa3->idJornada = 1;
        $programa3->idNivelFormacion = 1;
        $programa3->estado = 'habilitado';
        $programa3->save();

        $programa4 = new Programa();
        $programa4->nombre = 'procesos biologicos y de laboratorio';
        $programa4->duracion = 3450;
        $programa4->idModalidad = 2;
        $programa4->idJornada = 1;
        $programa4->idNivelFormacion = 2;
        $programa4->estado = 'habilitado';
        $programa4->save();

        $programa5 = new Programa();
        $programa5->nombre = 'peluqueria';
        $programa5->duracion = 2440;
        $programa5->idModalidad = 1;
        $programa5->idJornada = 2;
        $programa5->idNivelFormacion = 1;
        $programa5->estado = 'habilitado';
        $programa5->save();

        $programa6 = new Programa();
        $programa6->nombre = 'archivo';
        $programa6->duracion = 1200;
        $programa6->idModalidad = 2;
        $programa6->idJornada = 2;
        $programa6->idNivelFormacion = 1;
        $programa6->estado = 'habilitado';
        $programa6->save();

        $programa7 = new Programa();
        $programa7->nombre = 'construcciones y edificaciones';
        $programa7->duracion = 3360;
        $programa7->idModalidad = 2;
        $programa7->idJornada = 2;
        $programa7->idNivelFormacion = 2;
        $programa7->estado = 'habilitado';
        $programa7->save();

        $programa8 = new Programa();
        $programa8->nombre = 'english do works';
        $programa8->duracion = 90;
        $programa8->idModalidad = 1;
        $programa8->idJornada = 2;
        $programa8->idNivelFormacion = 1;
        $programa8->estado = 'habilitado';
        $programa8->save();

        $programa9 = new Programa();
        $programa9->nombre = 'logistica';
        $programa9->duracion = 3360;
        $programa9->idModalidad = 1;
        $programa9->idJornada = 2;
        $programa9->idNivelFormacion = 1;
        $programa9->estado = 'habilitado';
        $programa9->save();

        $programa10 = new Programa();
        $programa10->nombre = 'procesos contables';
        $programa10->duracion = 3360;
        $programa10->idModalidad = 2;
        $programa10->idJornada = 1;
        $programa10->idNivelFormacion = 2;
        $programa10->estado = 'habilitado';
        $programa10->save();




    }
}
