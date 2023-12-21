<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sede;

class SedeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $sede1 = new Sede();
        $sede1->sede = 'industrial';
        $sede1->save();

        $sede2 = new Sede();
        $sede2->sede = 'cbi';
        $sede2->save();

        $sede3 = new Sede();
        $sede3->sede = 'ambos';
        $sede3->save();
    }
}
