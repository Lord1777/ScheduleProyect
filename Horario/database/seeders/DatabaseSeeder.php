<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $this->call(AmbienteSeeder::class);
        $this->call(ModalidadSeeder::class);
        $this->call(JordanaSeeder::class);
        $this->call(NivelDeFormacionSeeder::class);
        $this->call(ProgramaSeeder::class);
        $this->call(TrimestreSeeder::class);
        $this->call(FichaSeeder::class);
        $this->call(ContratoSeeder::class);
        $this->call(UsuarioSeeder::class);
    }
}
