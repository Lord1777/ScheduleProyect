<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ambientes', function (Blueprint $table) {
            $table->integer('idAmbientes')->unique();
            $table->integer('capacidad');
            $table->integer('cantidadMesas');
            $table->boolean('aireAcondicionado');
            $table->boolean('videoBeam');
            $table->boolean('tablero');
            $table->integer('cantidadComputadores');
            $table->integer('limiteHoras');
            $table->integer('horasAsignadas');
            $table->string('estado');
            $table->unsignedBigInteger('idSede');

            $table->foreign('idSede')->references('idSede')->on('sedes');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ambientes');
    }
};
