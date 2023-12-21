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
        Schema::create('fichas', function (Blueprint $table) {
            $table->id('idFichas')->unique();
            $table->unsignedBigInteger('Ficha')->unique();
            $table->integer('limiteHoras');
            $table->integer('horasAsignadas');
            $table->unsignedBigInteger('idPrograma');
            $table->string('estado',30);
            // $table->engine = 'InnoDB';

            $table->foreign('idPrograma')->references('idProgramas')->on('programas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fichas');
    }
};
