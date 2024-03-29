<?php

// use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
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

Route::middleware(['cors'])->group(function (){

    // // Ruta para obtener el token CSRF
    // Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);  
    //Users
    Route::post('/register', [AuthController::class, 'register']);
    Route::match(['get', 'post'], '/login', [AuthController::class, 'login'])->name('login');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
    Route::get('/password-reset/{token}', [AuthController::class, 'showResetForm'])->name('password.reset');
    Route::post('/password-reset', [AuthController::class, 'resetPassword']);

    Route::get('/getInfoBarRecord/{idFicha}/{idHorario?}', [ScheduleController::class, 'indexRecord']);
    Route::get('/getScheduleApprentice/{idFicha}', [ScheduleController::class, 'scheduleApprentice']);
    Route::get('/getRecords', [RecordsController::class, 'getRecords']);
});



Route::middleware(['cors', 'auth:sanctum'])->group(function () {

    //Sanctum - Autenticacion
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);


    //Instructores
    Route::get('/getInstructors', [InstructorController::class, 'getInstructors']);
    Route::get('/getEnabledInstructors', [InstructorController::class, 'indexEnabled']);
    Route::get('/getDisableInstructors', [InstructorController::class, 'indexDisable']);
    Route::get('/getInstructor/{idUsuario}', [InstructorController::class, 'show']);
    Route::match(['get', 'put'], '/disableInstructor/{idUsuario}', [InstructorController::class, 'disable']);
    Route::match(['get', 'put'], '/enableInstructor/{idUsuario}', [InstructorController::class, 'enabled']);
    Route::put('/UpdateInstructor/{idUsuario}', [InstructorController::class, 'update']);
    

    //Coordinadores
    Route::get('/getEnabledCoordinators', [CoordinatorsController::class, 'indexEnabled']);
    Route::get('/getDisableCoordinators', [CoordinatorsController::class, 'indexDisable']);
    Route::get('/getCoordinator/{idUsuario}', [CoordinatorsController::class, 'show']);
    Route::match(['get', 'put'], '/disableCoordinator/{idUsuario}', [CoordinatorsController::class, 'disable']);
    Route::match(['get', 'put'], '/enableCoordinator/{idUsuario}', [CoordinatorsController::class, 'enabled']);
    Route::put('/UpdateCoordinator/{idUsuario}', [CoordinatorsController::class, 'update']);


    //Ambientes
    Route::get('/getEnvironments', [EnvironmentsController::class, 'getEnvironments']);
    Route::get('/getEnabledEnvironments', [EnvironmentsController::class, 'indexEnabled']);
    Route::get('/getDisableEnvironments', [EnvironmentsController::class, 'indexDisable']);
    Route::get('/getEnvironment/{idAmbiente}', [EnvironmentsController::class, 'show']);
    Route::post('/createEnvironment', [EnvironmentsController::class, 'store']);
    Route::put('/updateEnvironment/{idAmbiente}', [EnvironmentsController::class, 'update']);
    Route::match(['get', 'put'], '/disableEnvironment/{idAmbiente}', [EnvironmentsController::class, 'disable']);
    Route::match(['get', 'put'], '/enableEnvironment/{idAmbiente}', [EnvironmentsController::class, 'enabled']);


    //Programas
    Route::get('/getPrograms', [ProgramsController::class, 'getPrograms']);
    Route::post('/createProgram', [ProgramsController::class, 'store']);
    Route::get('/getEnableProgram', [ProgramsController::class, 'indexEnabled']);
    Route::get('/getDisableProgram', [ProgramsController::class, 'indexDisable']);
    Route::get('/GetProgram/{id}', [ProgramsController::class, 'show']);
    Route::put('/UpdateProgram/{id}', [ProgramsController::class, 'update']);
    Route::match(['get', 'put'], '/disableProgram/{idPrograma}', [ProgramsController::class, 'disable']);
    Route::match(['get', 'put'], '/enableProgram/{idPrograma}', [ProgramsController::class, 'enabled']);
    


    //Fichas
    Route::post('/createRecord', [RecordsController::class, 'store']);
    Route::get('/getEnabledRecords', [RecordsController::class, 'indexEnabled']);
    Route::get('/getDisableRecords', [RecordsController::class, 'indexDisable']);
    Route::get('/GetFicha/{id}', [RecordsController::class, 'show']);
    Route::put('/updateRecord/{id}', [RecordsController::class, 'update']);
    Route::match(['get', 'put'], '/disableRecord/{idFicha}', [RecordsController::class, 'disable']);
    Route::match(['get', 'put'], '/enableRecord/{idFicha}', [RecordsController::class, 'enabled']);


    //Trimestres
    Route::get('/getQuarters', [QuartersController::class, 'getQuarters']);
    Route::get('/getQuartersSchedule/{idFicha}', [QuartersController::class, 'getQuartersSchedule']);
    Route::get('/getEnabledQuarters', [QuartersController::class, 'indexEnabled']);
    Route::get('/getDisableQuarters', [QuartersController::class, 'indexDisable']);
    Route::post('/createQuarters', [QuartersController::class, 'store']);
    Route::match(['get', 'put'], '/disableQuarter/{idAmbiente}', [QuartersController::class, 'disable']);
    Route::match(['get', 'put'], '/enableQuarter/{idAmbiente}', [QuartersController::class, 'enabled']);
    Route::get('/GetTrimestre/{id}', [QuartersController::class, 'show']);
    Route::put('/updateQuater/{idTrimestre}', [QuartersController::class, 'update']);


    //Horarios academicos
    Route::match(['get', 'post'], '/createSchedule', [ScheduleController::class, 'store']);
    Route::get('/getScheduleInstructor/{idUsuario}/{idTrimestre?}/{idFicha?}', [ScheduleController::class, 'scheduleInstructor']);
    Route::get('/getAdminScheduleInstructor/{idUsuario}/{idTrimestre}', [ScheduleController::class, 'scheduleAdminInstructor']);
    Route::get('/getScheduleEnvironment/{idAmbiente}/{idTrimestre}', [ScheduleController::class, 'scheduleEnvironment']);
    Route::get('/getScheduleAdminApprentice/{idFicha}/{idHorario}', [ScheduleController::class, 'scheduleRecord']);
    // Route::get('/getScheduleAdminRecord/{idFicha}/{idHorario}', [ScheduleController::class, 'scheduleAdminRecord']);
    Route::get('/getScheduleRecord/{idTrimestre?}', [ScheduleController::class, 'scheduleEnableRecords']);
    Route::get('/getDisableScheduleRecord/{idTrimestre?}', [ScheduleController::class, 'scheduleDisableRecords']);
    Route::get('/getEnableScheduleInstructor/{idTrimestre?}', [ScheduleController::class, 'EnableSchedulesInstructors']);
    Route::get('/getSchedulesEnvironments/{idTrimestre?}', [ScheduleController::class, 'scheduleEnableEnvironments']);
    Route::put('/updateScheduleRecord/{idHorario}', [ScheduleController::class, 'update']);
    Route::match(['get', 'put'], '/enableSchedule/{idHorario}', [ScheduleController::class, 'enable']);
    Route::match(['get', 'put'], '/disableSchedule/{idHorario}', [ScheduleController::class, 'disable']);
    Route::get('/getHorarioComparationFicha/{idFicha}/{idTrimestre}', [ScheduleController::class, 'scheduleFichaGetIdTrimestre']);
    Route::get('/createAndUpdateBy/{idHorario}', [ScheduleController::class, 'CreateAndUpdateBy']);

    //Password
    Route::match(['get', 'put'], '/UpdatePassword/{idUsuario}', [AuthController::class, 'updatePassword']);
});


