<?php


use App\Http\Controllers\api\CoordinatorsController;
use App\Http\Controllers\api\EnvironmentsController;
use App\Http\Controllers\api\InstructorController;
use App\Http\Controllers\api\QuartersController;
use App\Http\Controllers\api\RecordsController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ProgramsController;
use App\Http\Controllers\api\ScheduleController;
use Illuminate\Support\Facades\Route;

//'cors' es el alias de Middleware para las cors


//Sanctum - Autenticacion
Route::group(['middleware' => ['cors']], function(){
    Route::post('/register', [AuthController::class, 'register']);
    Route::match(['get', 'post'],'/login', [AuthController::class, 'login']);


    //Instructores
    Route::get('getInstructors', [InstructorController::class, 'getInstructors']);
    Route::get('/getEnabledInstructors', [InstructorController::class, 'indexEnabled']);
    Route::get('/getDisableInstructors', [InstructorController::class, 'indexDisable']);
    Route::get('/getInstructor/{idUsuario}', [InstructorController::class, 'show']);
    Route::match(['get', 'put'], '/disableInstructor/{idUsuario}', [InstructorController::class, 'disable']);
    Route::match(['get', 'put'], '/enableInstructor/{idUsuario}', [InstructorController::class, 'enabled']);


    //Coordinadores
    Route::get('/getEnabledCoordinators', [CoordinatorsController::class, 'indexEnabled']);
    Route::get('/getDisableCoordinators', [CoordinatorsController::class, 'indexDisable']);
    Route::get('/getCoordinator/{idUsuario}', [CoordinatorsController::class, 'show']);
    Route::match(['get','put'],'/disableCoordinator/{idUsuario}', [CoordinatorsController::class, 'disable']);
    Route::match(['get','put'],'/enableCoordinator/{idUsuario}', [CoordinatorsController::class, 'enabled']);


    //Ambientes
    Route::get('getEnvironments', [EnvironmentsController::class, 'getEnvironments']);
    Route::get('/getEnabledEnvironments', [EnvironmentsController::class, 'indexEnabled']);
    Route::get('/getDisableEnvironments', [EnvironmentsController::class, 'indexDisable']);
    Route::get('/getEnvironment/{idAmbiente}', [EnvironmentsController::class, 'show']);
    Route::post('/createEnvironment', [EnvironmentsController::class, 'store']);
    Route::match(['get', 'put'], '/disableEnvironment/{idAmbiente}', [EnvironmentsController::class, 'disable']);
    Route::match(['get', 'put'], '/enableEnvironment/{idAmbiente}', [EnvironmentsController::class, 'enabled']);


    //Programas
    Route::post('/createProgram', [ProgramsController::class, 'store']);


    //Fichas
    Route::get('/getEnabledRecords', [RecordsController::class, 'indexEnabled']);
    Route::get('/getDisableRecords', [RecordsController::class, 'indexDisable']);


    //Trimestres
    Route::get('/getQuarters', [QuartersController::class, 'getQuarters']);
    Route::get('/getEnabledQuarters', [QuartersController::class, 'indexEnabled']);
    Route::get('/getDisableQuarters', [QuartersController::class, 'indexDisable']);
    Route::post('/createQuarters', [QuartersController::class, 'store']);
    Route::match(['get', 'put'], '/disableQuarter/{idAmbiente}', [QuartersController::class, 'disable']);
    Route::match(['get', 'put'], '/enableQuarter/{idAmbiente}', [QuartersController::class, 'enabled']);


    //Horarios academicos
    Route::match(['get', 'post'], '/createSchedule', [ScheduleController::class, 'store']);

});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);
});
