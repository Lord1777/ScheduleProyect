<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ficha>
 */
class FichaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ficha' => $this->faker->unique->numberBetween(2000000, 2700000),
            'limiteHoras' => 40,
            'horasAsignadas' => 0,
            'idPrograma' => $this->faker->numberBetween(1, 10),
            'estado' => $this->faker->randomElement(['habilitado', 'inhabilitado']),
            'idModalidad' => $this->faker->numberBetween(1,2),
            'idJornada' => $this->faker->numberBetween(1,2),
        ];
    }
}
