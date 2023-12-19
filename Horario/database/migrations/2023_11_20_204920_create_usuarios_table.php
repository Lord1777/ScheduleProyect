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
            $table->id('idUsuarios')->unique();
            $table->unsignedBigInteger('documento')->unique();
            $table->string('nombreCompleto',50);
            $table->string('ciudad',30);
            $table->string('departamento',30);
            $table->string('telefono',30);
            $table->string('profesion',100);
            $table->string('email',100);
            $table->text('experiencia');
            $table->string('contraseña',30);
            $table->integer('limiteHoras');
            $table->integer('horasAsignadas');
            $table->string('estado',30);
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
