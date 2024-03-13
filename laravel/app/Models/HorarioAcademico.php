<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

    public function createdBy() {
        return $this->belongsTo(Usuario::class, 'created_by');
    }
    
    public function updatedBy() {
        return $this->belongsTo(Usuario::class, 'updated_by');
    }

    protected static function boot() {
        parent::boot();

        static::creating(function ($recurso) {
            $recurso->created_by = Auth::id();
        });

        static::updating(function ($recurso) {
            $recurso->updated_by = Auth::id();
        });
    }
    
}
