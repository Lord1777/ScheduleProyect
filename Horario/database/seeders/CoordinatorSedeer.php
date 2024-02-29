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
    }

    // 'tipoDocumento' => $this->faker->randomElement([
    //     'cedula ciudadania',
    //     'cedula extranjeria',
    //     'tarjeta identidad',
    // ]),
    // 'documento' => $this->faker->unique()->numberBetween(100000000, 199999999),
    // 'nombreCompleto' => $this->faker->name,
    // 'ciudad' => $this->faker->randomElement([
    //     'palmira',
    //     'cali',
    //     'pradera',
    //     'candelaria',
    //     'villagorgona',
    //     'el bolo',
    //     'amaime',
    //     'poblado campestre',
    // ]),
    // 'telefono' => preg_replace('/[^0-9]/', '', $phoneNumber),
    // 'profesion' => $this->faker->randomElement([
    //     'Diseñador grafico',
    //     'ingeniero',
    //     'desarrollador de software',
    //     'ingeniero de software',
    //     'ingeniero en computaciones',
    //     'ingeniero en sistemas',
    //     'programador',
    //     'mecanico automotriz',
    //     'mecatronica',
    //     'electronica',
    //     'emprendimiento',
    //     'ciencias',
    //     'tecnologias de la informacion',
    //     'gestion empresarial'
    // ]),
    // 'email' => $this->faker->safeEmail,
    // 'experiencia' => $this->faker->paragraph,
    // 'password' => Hash::make($this->faker->password),
    // 'limiteHoras' => $this->faker->randomElement([35, 40]),
    // 'horasAsignadas' => 0,
    // 'estado' => $this->faker->randomElement(['habilitado', 'inhabilitado']),
    // 'idContrato' => $this->faker->numberBetween(1,2),
    // 'idSede' => $this->faker->numberBetween(1,3),
    // 'idRol' => $this->faker->numberBetween(1,2),
    // 'sesion' => 0,
}
