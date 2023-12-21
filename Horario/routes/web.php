<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/AddFicha', function(){
    return view('welcome');
});

Route::get('/AddAmbiente', function(){
    return view('welcome');
});

Route::get('/CrudTrimestres', function(){
    return view('welcome');
});

Route::get('/AddTrimestre', function(){
    return view('welcome');
});