<?php

use App\Http\Controllers\InstructorController;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    //Todas las rutas retornan welcome porque ahí es donde se está renderizando React
    return view('welcome');
})->where('any', '.*');


//Rutas que usan el middleware para solucionar las CORS
//'cors' es el alias de Middleware para las cors
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getInstructors', [InstructorController::class, 'index']);

});