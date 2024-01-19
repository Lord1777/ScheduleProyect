<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Ambiente;
use App\Models\Ficha;
use App\Models\Trimestre;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SedeSeeder::class);
        $this->call(RolSeeder::class);
        $this->call(ModalidadSeeder::class);
        $this->call(JordanaSeeder::class);
        $this->call(NivelDeFormacionSeeder::class);
        $this->call(ProgramaSeeder::class);
        $this->call(ContratoSeeder::class);
        Ambiente::factory(50)->create();
        Trimestre::factory(20)->create();
        Ficha::factory(50)->create();
        Usuario::factory(100)->create();
    }
}
