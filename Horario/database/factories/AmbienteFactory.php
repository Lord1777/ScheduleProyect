<?php

namespace Database\Factories;

use App\Models\Sede;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ambiente>
 */
class AmbienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ambiente' => $this->faker->unique->numberBetween(100, 200),
            'capacidad' => $this->faker->numberBetween(5, 50),
            'cantidadMesas' => $this->faker->numberBetween(5, 50),
            'aireAcondicionado' => $this->faker->boolean(),
            'videoBeam' => $this->faker->boolean(),
            'tablero' => $this->faker->boolean(),
            'cantidadComputadores' => $this->faker->numberBetween(5, 50),
            'limiteHoras' => 96,
            'horasAsignadas' => 0,
            'estado' => $this->faker->randomElement(['habilitado', 'inhabilitado']),
            'idSede' => Sede::all()->random()->idSede,
        ];
    }
}
