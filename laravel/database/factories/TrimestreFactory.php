<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trimestre>
 */
class TrimestreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'trimestre' => $this->faker->numberBetween(1,4),
            'fechaInicio' => $this->faker->dateTimeBetween('now', '+12 months'),
            'fechaFinal' => $this->faker->dateTimeBetween('now', '+3 months'),
            'estado' => $this->faker->randomElement(['habilitado', 'inhabilitado']),
        ];
    }
}
