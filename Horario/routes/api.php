<?php


use App\Http\Controllers\api\CoordinatorsController;
use App\Http\Controllers\api\EnvironmentsController;
use App\Http\Controllers\api\InstructorController;
use App\Http\Controllers\api\QuartersController;
use App\Http\Controllers\api\RecordsController;
use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Autenticacion
Route::group(['middleware' => ['cors']], function(){
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Rutas que usan el middleware para solucionar las CORS
//'cors' es el alias de Middleware para las cors

//Instructores
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getInstructors', [InstructorController::class, 'index']);
});

//Coordinadores
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getCoordinators', [CoordinatorsController::class, 'index']);
});

//Ambientes
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getEnvironments', [EnvironmentsController::class, 'index']);
    Route::post('/createEnvironments', [EnvironmentsController::class, 'store']);
});

//Fichas
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getRecords', [RecordsController::class, 'index']);
});

//Trimestres
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getQuarters', [QuartersController::class, 'index']);
    Route::post('/createQuarters', [QuartersController::class, 'store']);
});


