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
        Schema::create('programas', function (Blueprint $table) {
            $table->id('idPrograma')->unique();
            $table->string('nombre',300);
            $table->integer('duracion');
            $table->string('estado',30);
            $table->unsignedBigInteger('idNivelFormacion');
            // $table->engine = 'InnoDB';

            $table->foreign('idNivelFormacion')->references('idNivelFormacion')->on('niveles_de_formacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programas');
    }
};
