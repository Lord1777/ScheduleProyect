<?php

use App\Http\Controllers\CoordinatorsController;
use App\Http\Controllers\EnvironmentsController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\QuartersController;
use App\Http\Controllers\RecordsController;
use Illuminate\Support\Facades\Route;

//Rutas que usan el middleware para solucionar las CORS
//'cors' es el alias de Middleware para las cors

//Vista welcome siempre se retorna porque ahí es donde se está renderizando React JS
Route::get('/', fn() => view('welcome'));


Route::group(['middleware' => ['cors']], function(){
    Route::get('/CrudInstructor', fn() =>view('welcome'));
    Route::get('/getInstructors', [InstructorController::class, 'index']);
});


Route::group(['middleware' => ['cors']], function(){
    Route::get('/CrudCoordinadores', fn() => view('welcome'));
    Route::get('/getCoordinators', [CoordinatorsController::class, 'index']);
});


Route::group(['middleware' => ['cors']], function(){
    Route::get('/CrudAmbientes', fn() => view('welcome'));
    Route::get('/getEnvironments', [EnvironmentsController::class, 'index']);
});


Route::group(['middleware' => ['cors']], function(){
    Route::get('/CrudFichas', fn() => view('welcome'));
    Route::get('/getRecords', [RecordsController::class, 'index']);
});

Route::group(['middleware' => ['cors']], function(){
    Route::get('/CrudTrimestres', fn() => view('welcome'));
    Route::get('/getQuarters', [QuartersController::class, 'index']);
});



// Route::get('/{any}', function () {
//     //Todas las rutas retornan welcome porque ahí es donde se está renderizando React
//     return view('welcome');
// })->where('any', '.*');
