<?php


use App\Http\Controllers\api\CoordinatorsController;
use App\Http\Controllers\api\EnvironmentsController;
use App\Http\Controllers\api\InstructorController;
use App\Http\Controllers\api\QuartersController;
use App\Http\Controllers\api\RecordsController;
use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//'cors' es el alias de Middleware para las cors


//Sanctum - Autenticacion
Route::group(['middleware' => ['cors']], function(){
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);
});


//Instructores
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getEnabledInstructors', [InstructorController::class, 'indexEnabled']);
    Route::get('/getDisableInstructors', [InstructorController::class, 'indexDisable']);
    Route::get('/getInstructor/{idUsuario}', [InstructorController::class, 'show']);
    Route::put('/disableInstructor/{idUsuario}', [InstructorController::class, 'disable']);
    Route::put('/enableInstructor/{idUsuario}', [InstructorController::class, 'enabled']);
});


//Coordinadores
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getEnabledCoordinators', [CoordinatorsController::class, 'indexEnabled']);
    Route::get('/getDisableCoordinators', [CoordinatorsController::class, 'indexDisable']);
    Route::get('/getCoordinator/{idUsuario}', [CoordinatorsController::class, 'show']);
    Route::put('/disableCoordinator/{idUsuario}', [CoordinatorsController::class, 'disable']);
    Route::put('/enableCoordinator/{idUsuario}', [CoordinatorsController::class, 'enabled']);
});


//Ambientes
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getEnabledEnvironments', [EnvironmentsController::class, 'indexEnabled']);
    Route::get('/getDisableEnvironments', [EnvironmentsController::class, 'indexDisable']);
    Route::get('/getEnvironment/{idAmbiente}', [EnvironmentsController::class, 'show']);
    Route::post('/createEnvironment', [EnvironmentsController::class, 'store']);
    Route::put('/disableEnvironment/{idAmbiente}', [EnvironmentsController::class, 'disable']);
    Route::put('/enableEnvironment/{idAmbiente}', [EnvironmentsController::class, 'enabled']);

});


//Fichas
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getEnabledRecords', [RecordsController::class, 'indexEnabled']);
    Route::get('/getDisableRecords', [RecordsController::class, 'indexDisable']);
});


//Trimestres
Route::group(['middleware' => ['cors']], function(){
    Route::get('/getEnabledQuarters', [QuartersController::class, 'indexEnabled']);
    Route::get('/getDisableQuarters', [QuartersController::class, 'indexDisable']);
    Route::post('/createQuarters', [QuartersController::class, 'store']);
});


