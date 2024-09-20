<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\DetailController;
use App\Http\Controllers\Api\DiscountController;
use App\Http\Controllers\Api\FormAddController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\InfoController;
use App\Http\Controllers\Api\InfoOrderController;
use App\Http\Controllers\Api\MomoContronller;
use App\Http\Controllers\Api\NotifyController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PermissController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RateController;
use App\Http\Controllers\Api\ShipController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\VNPayController;
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
    Route::put('/update/user/{id}', [AuthController::class, 'updateUser']);

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/add/brand', [BrandController::class, 'store']);
    Route::post('add/product', [ProductController::class, 'store']);
    
    Route::put('/update/product/{product_id}', [ProductController::class, 'update']);
    Route::delete('/delete/product/{product_id}', [ProductController::class, 'destroy']);
    Route::post('/search/product/{data}', [ProductController::class, 'search']);


    Route::post('/add/image', [ImageController::class, 'store']);
    Route::get('/images/{product_id)', [ImageController::class, 'show']);
    
    Route::post('/add/cpu', [InfoController::class, 'addcpu']);
    Route::post('/add/ram', [InfoController::class, 'addram']);
    Route::post('/add/rom', [InfoController::class, 'addrom']);
    Route::post('/add/pin', [InfoController::class, 'addpin']);
    Route::post('/add/screen', [InfoController::class, 'addscreen']);
    Route::post('/add/os', [InfoController::class, 'addos']);
    Route::post('/add/camera', [InfoController::class, 'addcamera']);
    Route::post('/add/supplier', [InfoController::class, 'addsupplier']);

    Route::post('/add/permiss', [PermissController::class, 'addpermiss']);
    Route::post('/add/infopermiss/{employee_id}', [PermissController::class, 'addinfopermiss']);
    Route::get('/infopermiss', [PermissController::class, 'getinfopermiss']);
    Route::post('/add/form', [FormAddController::class, 'store']);
    Route::get('/form/{fap_id}', [FormAddController::class, 'show']);
    Route::put('/update/form/{fap_id}', [FormAddController::class, 'update']);
    Route::delete('/delete/form/{fap_id}', [FormAddController::class, 'destroy']);


    Route::post('/add/detail', [DetailController::class, 'save']);
    Route::get('/detail/{fap_id}', [DetailController::class, 'show']);
    
});
Route::get('/product/{product_id}', [ProductController::class, 'show']);
Route::get('/quantity', [DetailController::class, 'getQuantityProduct']);
Route::put('/update/quantity/{product_id}/{quantity}/{code}', [ProductController::class, 'updateQuantity']);
Route::put('/update/fap/quantity/{fap_id}', [ProductController::class, 'updateFapQuantity']);
Route::apiResource('/brands', BrandController::class);
Route::apiResource('/products', ProductController::class);
Route::apiResource('/images', ImageController::class);
Route::apiResource('/form', FormAddController::class);
Route::apiResource('/rating', RateController::class);
Route::apiResource('/discount', DiscountController::class);
Route::apiResource('/orders', OrderController::class);
Route::apiResource('/notify', NotifyController::class);
Route::apiResource('/shippers', ShipController::class);
Route::apiResource('/address', AddressController::class);
// Gio hang
Route::post('/add/cart', [CartController::class, 'create']);
Route::get('/cart/{user_id}', [CartController::class, 'show']);
Route::put('/update/cart', [CartController::class, 'update']);
Route::delete('/delete/cart/{product_id}/{user_id}', [CartController::class, 'destroy']);


//dia chi cua khach
Route::post('/add/address', [AddressController::class, 'store']);
Route::put('/update/address/{address_id}', [AddressController::class, 'update']);
// Lay thong tin dia chi da chon
Route::get('/address/{address_id}', [AddressController::class, 'show']);
// Lay tat ca dia chi cua user
Route::get('/address/user/{user_id}', [AddressController::class, 'showUser']);
Route::delete('/delete/address', [AddressController::class, 'destroy']);


// Danh gia
Route::get('/rating/order/{order_id}', [RateController::class, 'showO']);
Route::get('/rating/product/{product_id}', [RateController::class, 'showP']);
Route::post('/add/rating', [RateController::class, 'store']);
Route::delete('/delete/rating/{product_id}/{user_id}', [RateController::class, 'destroy']);

// thong bao
Route::post('/add/notify', [NotifyController::class, 'store']);
Route::get('/notify/{user_id}', [NotifyController::class, 'show']);
Route::put('/update/notify/{notify_id}', [NotifyController::class, 'update']);
Route::delete('/delete/notify/{notify_id}', [NotifyController::class, 'destroy']);

Route::get('/brand/{brand_id}', [InfoController::class, 'getOneBrand']);
Route::get('/os/{os_id}', [InfoController::class, 'getOneOs']);
Route::get('/ram/{ram_id}', [InfoController::class, 'getOneRam']);
Route::get('/screen/{screen_id}', [InfoController::class, 'getOneScreen']);
Route::get('/rom/{rom_id}', [InfoController::class, 'getOneRom']);
Route::get('/cpu/{cpu_id}', [InfoController::class, 'getOneCpu']);
Route::get('/cam/{cam_id}', [InfoController::class, 'getOneCam']);
Route::get('/pin/{pin_id}', [InfoController::class, 'getOnePin']);
Route::get('/cpus', [InfoController::class, 'getcpu']);

Route::get('/rams', [InfoController::class, 'getram']);
Route::get('/roms', [InfoController::class, 'getrom']);
Route::get('/pins', [InfoController::class, 'getpin']);
Route::get('/screens', [InfoController::class, 'getscreen']);
Route::get('/oss', [InfoController::class, 'getos']);
Route::get('/camera', [InfoController::class, 'getcamera']);
Route::get('/permiss', [PermissController::class, 'getpermiss']);
Route::get('/suppliers', [InfoController::class, 'getsuppliers']);
Route::get('/payments', [InfoController::class, 'getpayment']);
// Đăng kí đăng nhập
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login/shipper', [ShipController::class, 'login']);
Route::get('/users', [AuthController::class, 'getUser']);
Route::get('/user/{id}', [AuthController::class, 'getOneUser']);


Route::post('/add/payment', [InfoController::class, 'addpayment']);


Route::post('/add/discount', [DiscountController::class, 'store']);

Route::post('/add/shipper', [ShipController::class, 'store']);
Route::get('/shipper/{shipper_id}', [ShipController::class, 'show']);
// Order
Route::post('/add/order', [OrderController::class, 'store']);
Route::get('/order/{order_id}', [OrderController::class, 'show']);
Route::get('/order/user/{user_id}', [OrderController::class, 'showUser']);
Route::put('/update/order/{order_id}', [OrderController::class, 'update']);
Route::put('/update/order/shipper/{order_id}', [OrderController::class, 'updateShipper']);
Route::delete('/delete/order/{order_id}', [OrderController::class, 'destroy']);
Route::get('/search/order/{searchValue}', [OrderController::class, 'search']);
Route::get('/ordercomple', [OrderController::class, 'orderComple']);


// InfoOrder
Route::get('/info/order/{order_id}', [InfoOrderController::class, 'show']);
Route::post('/add/info/order', [InfoOrderController::class, 'store']);
Route::put('/update/info/order', [InfoOrderController::class, 'update']);
Route::delete('/delete/info/order/{order_id}', [InfoOrderController::class, 'deleteOrder']);
Route::delete('/delete/info/order/{order_id}/{product_id}', [InfoOrderController::class, 'destroy']);
Route::get('/search/info/order/{searchValue}', [InfoOrderController::class, 'searchAdmin']);
Route::get('/search/info/order/{searchValue}/{userId}', [InfoOrderController::class, 'search']);

Route::post('/file/{user_id}',[FileController::class,'store']);
Route::get('/file/{filename}',[FileController::class,'getAvatar']);
Route::get('/file/user/{user_id}',[FileController::class,'getFileName']);

// test api momo
Route::post('/momo-payment', [MomoContronller::class, 'createPayment']);
Route::post('/vnpay-payment', [VNPayController::class, 'createPayment']);
Route::get('/payment-return', [MomoContronller::class, 'paymentReturn']);

