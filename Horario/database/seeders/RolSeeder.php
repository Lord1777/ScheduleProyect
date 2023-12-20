<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rol1 = new Rol();
        $rol1->rol = 'coordinador';
        $rol1->save();

        $rol2 = new Rol();
        $rol2->rol = 'instructor';
        $rol2->save();
    }
}
