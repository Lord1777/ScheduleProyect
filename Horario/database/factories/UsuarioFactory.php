<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $phoneNumber = $this->faker->phoneNumber;
        
        return [
        'tipoDocumento' => $this->faker->randomElement([
            'cedula ciudadania',
            'cedula extranjeria',
            'tarjeta identidad',
        ]),
        'documento' => $this->faker->unique()->numberBetween(100000000, 199999999),
        'nombreCompleto' => $this->faker->name,
        'ciudad' => $this->faker->randomElement([
            'palmira',
            'cali',
            'pradera',
            'candelaria',
            'villagorgona',
            'el bolo',
            'amaime',
            'poblado campestre',
        ]),
        'telefono' => preg_replace('/[^0-9]/', '', $phoneNumber),
        'profesion' => $this->faker->randomElement([
            'Diseñador grafico',
            'ingeniero',
            'desarrollador de software',
            'ingeniero de software',
            'ingeniero en computaciones',
            'ingeniero en sistemas',
            'programador',
            'mecanico automotriz',
            'mecatronica',
            'electronica',
            'emprendimiento',
            'ciencias',
            'tecnologias de la informacion',
            'gestion empresarial'
        ]),
        'email' => $this->faker->safeEmail,
        'experiencia' => $this->faker->paragraph,
        'password' => Hash::make($this->faker->password),
        'limiteHoras' => $this->faker->randomElement([35, 40]),
        'horasAsignadas' => 0,
        'estado' => $this->faker->randomElement(['habilitado', 'inhabilitado']),
        'idContrato' => $this->faker->numberBetween(1,2),
        'idSede' => $this->faker->numberBetween(1,3),
        'idRol' => $this->faker->numberBetween(1,2),
        ];
    }
}
