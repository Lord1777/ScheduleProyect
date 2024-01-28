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
            $table->integer('boxIndex');
            $table->unsignedBigInteger('idAmbiente');
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('idHorarioAcademico');

            $table->foreign('idAmbiente')->references('idAmbiente')->on('ambientes');
            $table->foreign('idUsuario')->references('idUsuario')->on('usuarios');
            $table->foreign('idHorarioAcademico')->references('idHorario')->on('horarios_academicos');
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
