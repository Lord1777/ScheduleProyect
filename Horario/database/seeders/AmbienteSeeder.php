<?php

namespace Database\Seeders;

use App\Models\Ambiente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmbienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ambiente1 = new Ambiente();
        $ambiente1->ambiente = 115;
        $ambiente1->capacidad = 30;
        $ambiente1->cantidadMesas = 15;
        $ambiente1->aireAcondicionado = 1;
        $ambiente1->videoBeam = 1;
        $ambiente1->tablero = 1;
        $ambiente1->cantidadComputadores = 30;
        $ambiente1->limiteHoras = 96;
        $ambiente1->horasAsignadas = 0;
        $ambiente1->estado = 'habilitado';
        $ambiente1->idSede = 2;
        $ambiente1->save();

        $ambiente2 = new Ambiente();
        $ambiente2->ambiente = 116;
        $ambiente2->capacidad = 28;
        $ambiente2->cantidadMesas = 10;
        $ambiente2->aireAcondicionado = 0;
        $ambiente2->videoBeam = 1;
        $ambiente2->tablero = 1;
        $ambiente2->cantidadComputadores = 0;
        $ambiente2->limiteHoras = 96;
        $ambiente2->horasAsignadas = 0;
        $ambiente2->estado = 'habilitado';
        $ambiente2->idSede = 2;
        $ambiente2->save();

        $ambiente3 = new Ambiente();
        $ambiente3->ambiente = 117;
        $ambiente3->capacidad = 20;
        $ambiente3->cantidadMesas = 5;
        $ambiente3->aireAcondicionado = 0;
        $ambiente3->videoBeam = 0;
        $ambiente3->tablero = 0;
        $ambiente3->cantidadComputadores = 15;
        $ambiente3->limiteHoras = 96;
        $ambiente3->horasAsignadas = 0;
        $ambiente3->estado = 'habilitado';
        $ambiente3->idSede = 2;
        $ambiente3->save();

        $ambiente4 = new Ambiente();
        $ambiente4->ambiente = 118;
        $ambiente4->capacidad = 30;
        $ambiente4->cantidadMesas = 20;
        $ambiente4->aireAcondicionado = 0;
        $ambiente4->videoBeam = 0;
        $ambiente4->tablero = 1;
        $ambiente4->cantidadComputadores = 28;
        $ambiente4->limiteHoras = 96;
        $ambiente4->horasAsignadas = 0;
        $ambiente4->estado = 'habilitado';
        $ambiente4->idSede = 2;
        $ambiente4->save();

        $ambiente5 = new Ambiente();
        $ambiente5->ambiente = 119;
        $ambiente5->capacidad = 26;
        $ambiente5->cantidadMesas = 13;
        $ambiente5->aireAcondicionado = 1;
        $ambiente5->videoBeam = 1;
        $ambiente5->tablero = 1;
        $ambiente5->cantidadComputadores = 0;
        $ambiente5->limiteHoras = 96;
        $ambiente5->horasAsignadas = 0;
        $ambiente5->estado = 'habilitado';
        $ambiente5->idSede = 2;
        $ambiente5->save();

        $ambiente6 = new Ambiente();
        $ambiente6->ambiente = 114;
        $ambiente6->capacidad = 27;
        $ambiente6->cantidadMesas = 12;
        $ambiente6->aireAcondicionado = 0;
        $ambiente6->videoBeam = 0;
        $ambiente6->tablero = 1;
        $ambiente6->cantidadComputadores = 0;
        $ambiente6->limiteHoras = 96;
        $ambiente6->horasAsignadas = 0;
        $ambiente6->estado = 'habilitado';
        $ambiente6->idSede = 1;
        $ambiente6->save();

        $ambiente7 = new Ambiente();
        $ambiente7->ambiente = 113;
        $ambiente7->capacidad = 20;
        $ambiente7->cantidadMesas = 10;
        $ambiente7->aireAcondicionado = 0;
        $ambiente7->videoBeam = 1;
        $ambiente7->tablero = 0;
        $ambiente7->cantidadComputadores = 0;
        $ambiente7->limiteHoras = 96;
        $ambiente7->horasAsignadas = 0;
        $ambiente7->estado = 'habilitado';
        $ambiente7->idSede = 1;
        $ambiente7->save();

        $ambiente8 = new Ambiente();
        $ambiente8->ambiente = 112;
        $ambiente8->capacidad = 30;
        $ambiente8->cantidadMesas = 15;
        $ambiente8->aireAcondicionado = 0;
        $ambiente8->videoBeam = 1;
        $ambiente8->tablero = 0;
        $ambiente8->cantidadComputadores = 0;
        $ambiente8->limiteHoras = 96;
        $ambiente8->horasAsignadas = 0;
        $ambiente8->estado = 'habilitado';
        $ambiente8->idSede = 1;
        $ambiente8->save();

        $ambiente9 = new Ambiente();
        $ambiente9->ambiente = 111;
        $ambiente9->capacidad = 30;
        $ambiente9->cantidadMesas = 17;
        $ambiente9->aireAcondicionado = 1;
        $ambiente9->videoBeam = 0;
        $ambiente9->tablero = 1;
        $ambiente9->cantidadComputadores = 30;
        $ambiente9->limiteHoras = 96;
        $ambiente9->horasAsignadas = 0;
        $ambiente9->estado = 'habilitado';
        $ambiente9->idSede = 1;
        $ambiente9->save();

        $ambiente10 = new Ambiente();
        $ambiente10->ambiente = 110;
        $ambiente10->capacidad = 29;
        $ambiente10->cantidadMesas = 14;
        $ambiente10->aireAcondicionado = 1;
        $ambiente10->videoBeam = 1;
        $ambiente10->tablero = 0;
        $ambiente10->cantidadComputadores = 0;
        $ambiente10->limiteHoras = 96;
        $ambiente10->horasAsignadas = 0;
        $ambiente10->estado = 'habilitado';
        $ambiente10->idSede = 1;
        $ambiente10->save();
    }
}
