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
        Schema::create('niveles_de_formacion', function (Blueprint $table) {
            $table->id('idNivelFormacion')->unique();
            $table->string('nivel',30);
            $table->string('estado',30);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('niveles_de_formacion');
    }
};
