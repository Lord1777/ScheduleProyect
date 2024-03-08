<?php

namespace Database\Seeders;

use App\Models\Modalidad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModalidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modalidad1 = new Modalidad();
        $modalidad1->modalidad = 'virtual';
        $modalidad1->estado = 'habilitado';
        $modalidad1->save();

        $modalidad2 = new Modalidad();
        $modalidad2->modalidad = 'presencial';
        $modalidad2->estado = 'habilitado';
        $modalidad2->save();

        $modalidad3 = new Modalidad();
        $modalidad3->modalidad = 'complementaria';
        $modalidad3->estado = 'habilitado';
        $modalidad3->save();
    }
}
