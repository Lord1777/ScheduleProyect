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
        Schema::create('tematicas', function (Blueprint $table) {
            $table->id('idTematica')->unique();
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('idArea');

            $table->foreign('idUsuario')->references('documento')->on('usuarios');
            $table->foreign('idArea')->references('idArea')->on('areas_tematicas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tematicas');
    }
};