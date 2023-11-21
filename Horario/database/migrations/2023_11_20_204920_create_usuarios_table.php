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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->unsignedBigInteger('documento')->unique();
            $table->string('nombreCompleto');
            $table->string('ciudad');
            $table->string('departamento');
            $table->string('telefono');
            $table->string('profesion');
            $table->string('email');
            $table->text('experiencia');
            $table->string('contraseña');
            $table->integer('limiteHoras');
            $table->integer('horasAsignadas');
            $table->string('estado');
            $table->unsignedBigInteger('idContrato');
            $table->unsignedBigInteger('idSede');
            $table->unsignedBigInteger('idRol');

            $table->foreign('idContrato')->references('idContrato')->on('contratos');
            $table->foreign('idSede')->references('idSede')->on('sedes');
            $table->foreign('idRol')->references('idRol')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
