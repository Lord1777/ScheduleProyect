<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    use HasFactory;

    protected $primaryKey = 'idPrograma';
    public $timestamps = false;

    public function nivel()
    {
        return $this->belongsTo(NivelDeFormacion::class, 'idNivelFormacion');
    }

    public function modalidad()
    {
        return $this->belongsTo(Modalidad::class, 'idModalidad');
    }

    public function jornada()
    {
        return $this->belongsTo(Jornada::class, 'idJornada');
    }
}
