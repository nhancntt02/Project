<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\DetailController;
use App\Http\Controllers\Api\FormAddController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\InfoController;
use App\Http\Controllers\Api\PermissController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Routing\RouteRegistrar;
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
    Route::get('/product/{product_id}', [ProductController::class, 'show']);
    Route::put('/update/product/{product_id}', [ProductController::class, 'update']);
    Route::delete('/delete/product/{product_id}', [ProductController::class, 'destroy']);
    Route::post('/search/product/{data}', [ProductController::class, 'search']);


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
    Route::post('/add/form', [FormAddController::class, 'store']);
    Route::get('/form/{fap_id}', [FormAddController::class, 'show']);
    Route::put('/update/form/{fap_id}', [FormAddController::class, 'update']);
    Route::delete('/delete/form/{fap_id}', [FormAddController::class, 'destroy']);


    Route::post('/add/detail', [DetailController::class, 'save']);
    Route::get('/detail/{fap_id}', [DetailController::class, 'show']);
    Route::get('/quantity', [DetailController::class, 'getQuantityProduct']);
});
Route::apiResource('/brands', BrandController::class);
Route::apiResource('/products', ProductController::class);
Route::apiResource('/images', ImageController::class);
Route::apiResource('/form', FormAddController::class);

Route::get('/cpus', [InfoController::class, 'getcpu']);
Route::get('/rams', [InfoController::class, 'getram']);
Route::get('/roms', [InfoController::class, 'getrom']);
Route::get('/pins', [InfoController::class, 'getpin']);
Route::get('/screens', [InfoController::class, 'getscreen']);
Route::get('/oss', [InfoController::class, 'getos']);
Route::get('/camera', [InfoController::class, 'getcamera']);
Route::get('/permiss', [PermissController::class, 'getpermiss']);
Route::get('/suppliers', [InfoController::class, 'getsuppliers']);
// Đăng kí đăng nhập
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [AuthController::class, 'getUser']);
Route::get('/user/{id}', [AuthController::class, 'getOneUser']);
