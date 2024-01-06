<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario1 = new Usuario();
        $usuario1->tipoDeDocumento = 'cedula ciudadania';
        $usuario1->documento = 1258785611;
        $usuario1->nombreCompleto = 'marlon ortiz rivera';
        $usuario1->ciudad = 'cali';
        $usuario1->telefono = '3105467898';
        $usuario1->profesion = 'ingeniero en sistemas';
        $usuario1->email = 'marlon@gmail.com';
        $usuario1->experiencia = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste fugit facere illum perspiciatis totam possimus velit? Fugiat, id accusamus dolor, ex fuga, nisi consequuntur quasi nulla quo dolores magni repellat.';
        $usuario1->contraseña = Hash::make('contraseña123');
        $usuario1->limiteHoras = 35;
        $usuario1->horasAsignadas = 0;
        $usuario1->estado = 'habilitado';
        $usuario1->idContrato = 2;
        $usuario1->idSede = 3;
        $usuario1->idRol = 2;
        $usuario1->save();

        $usuario2 = new Usuario();
        $usuario2->tipoDeDocumento = 'cedula ciudadania';
        $usuario2->documento = 1564651345;
        $usuario2->nombreCompleto = 'alfredo sierra';
        $usuario2->ciudad = 'palmira';
        $usuario2->telefono = '3542745645';
        $usuario2->profesion = 'ingeniero de software';
        $usuario2->email = 'alfredo@gmail.com';
        $usuario2->experiencia = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste fugit facere illum perspiciatis totam possimus velit? Fugiat, id accusamus dolor, ex fuga, nisi consequuntur quasi nulla quo dolores magni repellat.';
        $usuario2->contraseña = Hash::make('exitos.');
        $usuario2->limiteHoras = 40;
        $usuario2->horasAsignadas = 0;
        $usuario2->estado = 'habilitado';
        $usuario2->idContrato = 1;
        $usuario2->idSede = 3;
        $usuario2->idRol = 2;
        $usuario2->save();

        $usuario3 = new Usuario();
        $usuario3->tipoDeDocumento = 'cedula ciudadania';
        $usuario3->documento = 1008785611;
        $usuario3->nombreCompleto = 'alejandro guespud';
        $usuario3->ciudad = 'cali';
        $usuario3->telefono = '3212714581';
        $usuario3->profesion = 'ingeniero en sistemas';
        $usuario3->email = 'aguespud@gmail.com';
        $usuario3->experiencia = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste fugit facere illum perspiciatis totam possimus velit? Fugiat, id accusamus dolor, ex fuga, nisi consequuntur quasi nulla quo dolores magni repellat.';
        $usuario3->contraseña = Hash::make('solofrontend');
        $usuario3->limiteHoras = 35;
        $usuario3->horasAsignadas = 0;
        $usuario3->estado = 'habilitado';
        $usuario3->idContrato = 2;
        $usuario3->idSede = 2;
        $usuario3->idRol = 2;
        $usuario3->save();

        $usuario4 = new Usuario();
        $usuario4->tipoDeDocumento = 'cedula ciudadania';
        $usuario4->documento = 11078547412;
        $usuario4->nombreCompleto = 'freddy jose diaz';
        $usuario4->ciudad = 'pradera';
        $usuario4->telefono = '3105467858';
        $usuario4->profesion = 'arquitecto';
        $usuario4->email = 'marlon@gmail.com';
        $usuario4->experiencia = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste fugit facere illum perspiciatis totam possimus velit? Fugiat, id accusamus dolor, ex fuga, nisi consequuntur quasi nulla quo dolores magni repellat.';
        $usuario4->contraseña = Hash::make('123456789');
        $usuario4->limiteHoras = 35;
        $usuario4->horasAsignadas = 0;
        $usuario4->estado = 'habilitado';
        $usuario4->idContrato = 2;
        $usuario4->idSede = 1;
        $usuario4->idRol = 2;
        $usuario4->save();

        $usuario5 = new Usuario();
        $usuario5->tipoDeDocumento = 'cedula extrangeria';
        $usuario5->documento = 1258785612;
        $usuario5->nombreCompleto = 'edinson yamid cuaran';
        $usuario5->ciudad = 'cerrito';
        $usuario5->telefono = '3175217746';
        $usuario5->profesion = 'astro fisico';
        $usuario5->email = 'marlon@gmail.com';
        $usuario5->experiencia = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste fugit facere illum perspiciatis totam possimus velit? Fugiat, id accusamus dolor, ex fuga, nisi consequuntur quasi nulla quo dolores magni repellat.';
        $usuario5->contraseña = Hash::make('venidacristo');
        $usuario5->limiteHoras = 40;
        $usuario5->horasAsignadas = 0;
        $usuario5->estado = 'habilitado';
        $usuario5->idContrato = 1;
        $usuario5->idSede = 1;
        $usuario5->idRol = 2;
        $usuario5->save();

        $usuario6 = new Usuario();
        $usuario6->tipoDeDocumento = 'cedula ciudadania';
        $usuario6->documento = 1107839963;
        $usuario6->nombreCompleto = 'samuel pulgarin muñoz';
        $usuario6->ciudad = 'cali';
        $usuario6->telefono = '3122301976';
        $usuario6->profesion = 'desarrollador de software';
        $usuario6->email = 'samuel_pulgarinm@misena.edu.co';
        $usuario6->experiencia = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste fugit facere illum perspiciatis totam possimus velit? Fugiat, id accusamus dolor, ex fuga, nisi consequuntur quasi nulla quo dolores magni repellat.';
        $usuario6->contraseña = Hash::make('undead');
        $usuario6->limiteHoras = 40;
        $usuario6->horasAsignadas = 0;
        $usuario6->estado = 'habilitado';
        $usuario6->idContrato = 1;
        $usuario6->idSede = 3;
        $usuario6->idRol = 1;
        $usuario6->save();
    }
}
