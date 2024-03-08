<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ficha extends Model
{
    use HasFactory;

    protected $primaryKey = 'idFicha';

    public $timestamps = false;

    protected $fillable = [
        'ficha',
        'limiteHoras',
        'horasAsignadas',
        'idPrograma',
        'estado',
        'idModalidad',
        'idJornada',
    ];

    public function programa()
    {
        return $this->belongsTo(Programa::class, 'idPrograma');
    }
}
