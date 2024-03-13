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
        Schema::create('horarios_academicos', function (Blueprint $table) {
            $table->id('idHorario')->unique();
            $table->string('estado', 30);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('idFicha');
            $table->unsignedBigInteger('idTrimestre');

            $table->foreign('idFicha')->references('idFicha')->on('fichas');
            $table->foreign('idTrimestre')->references('idTrimestre')->on('trimestres');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horarios_academicos');
    }
};
