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
        Schema::create('asignaciones', function (Blueprint $table) {
            $table->id('idAsignacion')->unique();
            $table->string('dia',30);
            $table->integer('horaInicio');
            $table->integer('horaFinal');
            $table->string('estado',30);
            $table->unsignedBigInteger('idFicha');
            $table->unsignedBigInteger('idAmbiente');
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('idTrimestre');

            $table->foreign('idFicha')->references('idFicha')->on('fichas');
            $table->foreign('idAmbiente')->references('idAmbiente')->on('ambientes');
            $table->foreign('idUsuario')->references('idUsuario')->on('usuarios');
            $table->foreign('idTrimestre')->references('idTrimestre')->on('trimestres');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignaciones');
    }
};
