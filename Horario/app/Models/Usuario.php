<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    //Especifica la llave primaria
    protected $primaryKey = 'idUsuario';

    ///desactiva las marcas de tiempo
    public $timestamps = false;

    //Columnas que se ocultaran cuando el modelo se convierta en un array o se serialize a JSON
    protected $hidden = [
        'password',
        'remember_token',
        'estado',
    ];

    //Especifica como debe ser convertidos o interpretados estas columnas
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];   
    
    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'tipoDeDocumento',
        'documento',
        'nombreCompleto',
        'ciudad',
        'telefono',
        'profesion',
        'email',
        'experiencia',
        'password',
        'limiteHoras',
        'horasAsignadas',
        'estado',
        'idContrato',
        'idSede',
        'idRol',
    ];

    // Relación la tabla roles
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'idRol');
    }
}
