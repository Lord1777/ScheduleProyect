<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CoordinatorSedeer extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coordinador1 = new Usuario;
        $coordinador1->tipoDocumento = 'cedula ciudadania';
        $coordinador1->documento = 1107839963;
        $coordinador1->nombreCompleto = 'samuel pulgarin muñoz';
        $coordinador1->ciudad = 'cali';
        $coordinador1->telefono = 3135698795;
        $coordinador1->profesion = 'desarrollador de software';
        $coordinador1->email = 'samuelpulgarin37@gmail.com';
        $coordinador1->experiencia = 'Tecnologo en analisis y desarrollo de software. Aprendiz que en su momento a desarrollado el presente aplicativo';
        $coordinador1->password = Hash::make(123456789);
        $coordinador1->limiteHoras = 999;
        $coordinador1->horasAsignadas = 0;
        $coordinador1->estado = 'habilitado';
        $coordinador1->idContrato = 1;
        $coordinador1->idSede = 3;
        $coordinador1->idRol = 1;
        $coordinador1->sesion = 1;
        $coordinador1->save();

        $coordinador2 = new Usuario;
        $coordinador2->tipoDocumento = 'cedula ciudadania';
        $coordinador2->documento = 1127625427;
        $coordinador2->nombreCompleto = 'césar negrón adrián vente';
        $coordinador2->ciudad = 'palmira';
        $coordinador2->telefono = 3165697101;
        $coordinador2->profesion = 'desarrollador de software';
        $coordinador2->email = 'cesarnegron16@gmail.com';
        $coordinador2->experiencia = 'Tecnologo en analisis y desarrollo de software. Aprendiz que en su momento a desarrollado el presente aplicativo';
        $coordinador2->password = Hash::make(123456789);
        $coordinador2->limiteHoras = 999;
        $coordinador2->horasAsignadas = 0;
        $coordinador2->estado = 'habilitado';
        $coordinador2->idContrato = 1;
        $coordinador2->idSede = 3;
        $coordinador2->idRol = 1;
        $coordinador2->sesion = 1;
        $coordinador2->save();
    }
}
