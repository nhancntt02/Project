<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('brands', BrandController::class);
Route::post('/add/brand', [BrandController::class, 'store']);
Route::apiResource('/products', ProductController::class);
Route::post('add/product', [ProductController::class, 'store']);
Route::apiResource('images', ImageController::class);
Route::post('/add/image', [ImageController::class, 'store']);

Route::post('/add/payment',[InfoController::class, 'addpayment']);
Route::post('/add/cpu', [InfoController::class, 'addcpu']);
Route::post('/add/ram', [InfoController::class, 'addram']);
Route::post('/add/rom', [InfoController::class, 'addrom']);
Route::post('/add/pin', [InfoController::class, 'addpin']);
Route::post('/add/screen', [InfoController::class, 'addscreen']);
Route::post('/add/os', [InfoController::class, 'addos']);
Route::post('/add/camera', [InfoController::class, 'addcamera']);

Route::get('/cpus', [InfoController::class, 'getcpu']);
Route::get('/rams', [InfoController::class, 'getram']);
Route::get('/roms', [InfoController::class, 'getrom']);
Route::get('/pins', [InfoController::class, 'getpin']);
Route::get('/screens', [InfoController::class, 'getscreen']);
Route::get('/oss', [InfoController::class, 'getos']);
Route::get('/camera', [InfoController::class, 'getcamera']);

Route::post('/add/permiss', [PermissController::class, 'addpermiss']);
Route::post('/add/infopermiss', [PermissController::class, 'addinfopermiss']);