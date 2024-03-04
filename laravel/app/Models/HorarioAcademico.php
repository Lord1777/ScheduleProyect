<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorarioAcademico extends Model
{
    use HasFactory;

    protected $primaryKey = 'idHorario';

    protected $table = 'horarios_academicos';

    public $timestamps = false;

    protected $fillable = [
        'idHorario',
        'estado',
        'idFicha',
        'idTrimestre',
    ];
}
