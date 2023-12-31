<?php


use Illuminate\Support\Facades\Route;


//Vista welcome siempre se retorna porque ahí es donde se está renderizando React JS
Route::get('/', fn() => view('welcome'));
Route::get('/ConsultaAprendiz', fn() => view('welcome'));
Route::get('/AddFicha', fn() => view('welcome'));
Route::match(['get','post'], '/AddInstructor', fn() => view('welcome'));
Route::match(['get', 'post'], '/AddCoordinador', fn()=> view('welcome'));
Route::get('/Ambientes', fn() => view('welcome'));
Route::get('/HorariosFichas', fn() => view('welcome'));
Route::get('/CrudInstructor', fn() =>view('welcome'));
Route::get('/CrudCoordinadores', fn() => view('welcome'));
Route::get('/CrudAmbientes', fn() => view('welcome'));
Route::match(['get', 'post'], '/AddAmbiente', fn() => view('welcome'));
Route::get('/CrudFichas', fn() => view('welcome'));
Route::get('/CrudTrimestres', fn() => view('welcome'));
Route::match(['get', 'post'],'/AddTrimestre', fn() => view('welcome'));
Route::get('/Panel', fn() => view('welcome'));
Route::get('/ConsultaAprendiz', fn() => view('welcome'));


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

