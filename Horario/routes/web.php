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
Route::get('/ConsultaAprendiz', fn() => view('welcome'));
Route::get('/CrudInstructor', fn() => view('welcome'));
Route::get('/CrudCoordinadores', fn() => view('welcome'));
Route::get('/CrudAmbientes', fn() => view('welcome'));
Route::get('/CrudFichas', fn() => view('welcome'));
Route::get('/AddFicha', fn() => view('welcome'));
Route::get('/CrudTrimestres', fn() => view('welcome'));
Route::get('/AddTrimestre', fn() => view('welcome'));
Route::get('/Ambientes', fn() => view('welcome'));
Route::get('/HorariosFichas', fn() => view('welcome'));
Route::get('/modal', fn() => view('welcome'));
Route::get('/pruebam', fn() => view('welcome'));


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

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Panel', function(){
    return view('welcome');
});

Route::get('/ConsultaAprendiz', function(){
    return view('welcome');
});

Route::get('/CrudInstructor', function(){
    return view('welcome');
});

Route::get('/CrudCoordinadores', function(){
    return view('welcome');
});

Route::get('/CrudAmbientes', function(){
    return view('welcome');
});

Route::get('/CrudFichas', function(){
    return view('welcome');
});

Route::get('/Ambientes', function(){
    return view('welcome');
});

Route::get('/HorariosFichas', function(){
    return view('welcome');
});