<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignacion extends Model
{
    use HasFactory;

    protected $primaryKey = 'idAsignacion';

    protected $table = 'asignaciones';

    public $timestamps = false;

    protected $fillable = [
        'boxIndex',
        'idAmbiente',
        'idUsuario',
        'idHorarioAcademico',
    ];
}
