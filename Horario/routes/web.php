<?php


use Illuminate\Support\Facades\Route;


//Vista welcome siempre se retorna porque ahí es donde se está renderizando React JS
Route::match(['get', 'post'], '/', fn() => view('welcome'));
Route::match(['get', 'post'], '/RecuperarContraseña', fn() => view('welcome'));
Route::get('/ConsultaAprendiz', fn() => view('welcome'));
Route::get('/AddFicha', fn() => view('welcome'));
Route::match(['get','post'], '/AddInstructor', fn() => view('welcome'));
Route::match(['get', 'post'], '/AddCoordinador', fn()=> view('welcome'));
Route::match(['get', 'post'], '/AddPrograma', fn() => view('welcome'));
Route::get('/Ambientes', fn() => view('welcome'));
Route::get('/HorariosFichas', fn() => view('welcome'));
Route::match(['get', 'put'], '/CrudInstructor', fn() =>view('welcome'));
Route::match(['get', 'put'], '/CrudCoordinadores', fn() => view('welcome'));
Route::match(['get', 'put'], '/CrudAmbientes', fn() => view('welcome'));
Route::match(['get', 'post'], '/AddAmbiente', fn() => view('welcome'));
Route::get('/CrudFichas', fn() => view('welcome'));
Route::match(['get', 'put'],'/CrudTrimestres', fn() => view('welcome'));
Route::match(['get', 'post'],'/AddTrimestre', fn() => view('welcome'));
Route::get('/Panel', fn() => view('welcome'));
Route::get('/ConsultaAprendiz', fn() => view('welcome'));
Route::get('/DetallesFicha', fn() => view('welcome'));
Route::get('/DetallesAmbiente', fn() => view('welcome'));
Route::get('/DetallesCoordinador', fn()=> view('welcome'));
Route::get('/DetallesInstructor', fn() => view('welcome'));
Route::get('/DetallesTrimestre', fn() => view('welcome'));
Route::get('403-forbidden', fn() => view('welcome'));
Route::get('/HorarioAprendiz/{idFicha}/{idHorario}', fn() => view('welcome'));
Route::get('/HorarioInstructor/{idUsuario}', fn()=> view('welcome'));
Route::get('/HorarioAdminInstructor/{idUsuario}/{idHorario}', fn()=> view('welcome'));
Route::get('/HorarioAmbiente', fn()=> view('welcome'));
Route::match(['get', 'post'], '/AddHorario/{id}', fn() => view('welcome'));
Route::match(['get', 'post'], '/UpdateHorarioInstructor/{idUsuario}', fn() => view('welcome'));
Route::match(['get', 'put'], '/ScheduleUpdateFicha/{idFicha}/{idHorario}/{idTrimestre}', fn() => view('welcome'));
Route::get('/modal', fn() => view('welcome'));
Route::match(['get','put'], '/UpdateAmbiente/{id}', fn() => view('welcome'));
Route::match(['get','put'], '/UpdateFicha/{id}', fn() => view('welcome'));
Route::match(['get','put'], '/UpdateInstructor/{id}', fn() => view('welcome'));
Route::match(['get','put'], '/UpdateCoordinador/{id}', fn() => view('welcome'));
Route::match(['get', 'put'], '/UpdateTrimestre/{id}', fn() => view('welcome'));
Route::get('/CrudProgramas', fn() => view('welcome'));
Route::match(['get','put'], '/UpdatePrograma/{id}', fn()=> view('welcome'));
Route::get('/HorariosInstructores', fn() => view('welcome'));
Route::get('/HorariosAmbientes', fn()=> view('welcome'));
Route::get('/PanelHorarios', fn()=> view('welcome'));
Route::get('/Card', fn()=> view('welcome'));
Route::get('/Perfil', fn() => view('welcome'));
Route::get('/Modalc', fn() => view('welcome'));

// Route::get('/{any}', function () {
//     //Todas las rutas retornan welcome porque ahí es donde se está renderizando React
//     return view('welcome');
// })->where('any', '.*');