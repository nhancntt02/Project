<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\InfoController;
use App\Http\Controllers\Api\PermissController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/add/brand', [BrandController::class, 'store']);
    Route::post('add/product', [ProductController::class, 'store']);
    Route::post('/add/image', [ImageController::class, 'store']);
    Route::post('/add/payment', [InfoController::class, 'addpayment']);
    Route::post('/add/cpu', [InfoController::class, 'addcpu']);
    Route::post('/add/ram', [InfoController::class, 'addram']);
    Route::post('/add/rom', [InfoController::class, 'addrom']);
    Route::post('/add/pin', [InfoController::class, 'addpin']);
    Route::post('/add/screen', [InfoController::class, 'addscreen']);
    Route::post('/add/os', [InfoController::class, 'addos']);
    Route::post('/add/camera', [InfoController::class, 'addcamera']);
    Route::post('/add/permiss', [PermissController::class, 'addpermiss']);
    Route::post('/add/infopermiss/{employee_id}', [PermissController::class, 'addinfopermiss']);
});
Route::apiResource('/brands', BrandController::class);
Route::apiResource('/products', ProductController::class);
Route::apiResource('/images', ImageController::class);

Route::get('/cpus', [InfoController::class, 'getcpu']);
Route::get('/rams', [InfoController::class, 'getram']);
Route::get('/roms', [InfoController::class, 'getrom']);
Route::get('/pins', [InfoController::class, 'getpin']);
Route::get('/screens', [InfoController::class, 'getscreen']);
Route::get('/oss', [InfoController::class, 'getos']);
Route::get('/camera', [InfoController::class, 'getcamera']);




Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
