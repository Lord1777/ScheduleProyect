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
        $programa1->nombre = 'Analisis y Desarrollo de SOftware';
        $programa1->duracion = 3963;
        $programa1->estado = 'habilitado';
        $programa1->idNivelFormacion = 2;
        $programa1->save();

        $programa2 = new Programa();
        $programa2->nombre = 'Analisis y Desarrollo de Sistemas de la Informacion';
        $programa2->duracion = 3503;
        $programa2->estado = 'inhabilitado';
        $programa2->idNivelFormacion = 2;
        $programa2->save();

        $programa3 = new Programa();
        $programa3->nombre = 'peluqueria';
        $programa3->duracion = 1000;
        $programa3->estado = 'habilitado';
        $programa3->idNivelFormacion = 1;
        $programa3->save();

        $programa4 = new Programa();
        $programa4->nombre = 'construcciones y edificaciones';
        $programa4->duracion = 2650;
        $programa4->estado = 'habilitado';
        $programa4->idNivelFormacion = 1;
        $programa4->save();

        $programa5 = new Programa();
        $programa5->nombre = 'logistica';
        $programa5->duracion = 3830;
        $programa5->estado = 'habilitado';
        $programa5->idNivelFormacion = 2;
        $programa5->save();

        $programa6 = new Programa();
        $programa6->nombre = 'Mecanica Automotriz';
        $programa6->duracion = 2896;
        $programa6->estado = 'habilitado';
        $programa6->idNivelFormacion = 1;
        $programa6->save();

        $programa7 = new Programa();
        $programa7->nombre = 'diseño y desarrollo de aplicaciones moviles';
        $programa7->duracion = 2863;
        $programa7->estado = 'habilitado';
        $programa7->idNivelFormacion = 2;
        $programa7->save();

        $programa8 = new Programa();
        $programa8->nombre = 'turismo';
        $programa8->duracion = 1742;
        $programa8->estado = 'habilitado';
        $programa8->idNivelFormacion = 1;
        $programa8->save();

        $programa9 = new Programa();
        $programa9->nombre = 'diseño grafico';
        $programa9->duracion = 2600;
        $programa9->estado = 'habilitado';
        $programa9->idNivelFormacion = 1;
        $programa9->save();

        $programa10 = new Programa();
        $programa10->nombre = 'english do works';
        $programa10->duracion = 1000;
        $programa10->estado = 'habilitado';
        $programa10->idNivelFormacion = 1;
        $programa10->save();
    }
}
