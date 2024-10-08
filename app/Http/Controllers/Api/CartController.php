<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Cart::query()->select('*')->get();

        return response()->json([
            'data' => $data,
        ], 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $cart = $request->validate([
            'product_id' => 'required|string|exists:products,product_id',
            'user_id' => 'required|exists:users,id',
            'cart_quantity' => 'required|integer',
        ]);


        $existCart = Cart::where('product_id', $cart['product_id'])
            ->where('user_id', $cart['user_id'])
            ->first();

        if ($existCart) {
            $a = $existCart->cart_quantity += 1;

            Cart::where('product_id', $cart['product_id'])
                ->where('user_id', $cart['user_id'])
                ->update(['cart_quantity' => $a]);


            return response()->json([
                'message' => 'Thêm sản phẩm vào giỏ hàng thành công'
            ], 201);
        } else {
            $rs = Cart::create($cart);
            return response()->json([
                'message' => 'Thêm sản phẩm vào giỏ hàng thành công',
            ], 201);
        }


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $data = Cart::query()->where('user_id', $user_id)->get();

        return response()->json([
            'data' => $data,
        ], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($product_id, $user_id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|string|exists:products,product_id',
            'user_id' => 'required|exists:users,id',
            'cart_quantity' => 'required|integer',
        ]);

        $existCart = Cart::where('product_id', $data['product_id'])
            ->where('user_id', $data['user_id'])
            ->update(['cart_quantity' => $data['cart_quantity']]);

        if ($existCart) {
            return response()->json([
                'message' => 'Cập nhật số lượng thành công'
            ], 201);
        } else {
            return response()->json([
                'message' => 'Lỗi! Không tìm thấy sản phẩm trong giỏ hàng'
            ], 404);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($product_id, $user_id)
    {

        $existCart = Cart::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->delete();
        if ($existCart) {
            return response()->json([
                'message' => 'Xóa giỏ hàng thành công'
            ], 201);
        } else {
            return response()->json([
                'message' => 'Lỗi! Không tìm thấy sản phẩm trong giỏ hàng'
            ], 404);
        }
    }
}
