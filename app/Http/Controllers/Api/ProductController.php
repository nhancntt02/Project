<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(
            Product::query()->select('*')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        if ($request->validated()) {
            $data = $request->validated();
            $product = Product::create($data);
            return response()->json(['message' => 'Thêm sản phẩm thành công'], 201);
        } else {
            return response([
                'message' => 'Co loi xay ra'
            ], 422);
        }

    }

    /**
     * Display the specified resource.
     */


    public function show($product_id)
    {
        $products = Product::where('product_id', $product_id)->get();

        return ProductResource::collection($products);
    }

    public function search($data)
    {
        $products = Product::where('product_name', 'like', '%' . $data . '%')->get();

        if ($products) {
            return response()->json([
                'products' => ProductResource::collection($products),
                'message' => 'Tìm kiếm thành công'
            ], 201);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $product_id)
    {
        $validatedData = $request->validated();
        $existingProduct = Product::where('product_id', $product_id)->first();

        if ($existingProduct) {
            $existingProduct->update($validatedData);
            return response()->json(['message' => 'Sửa sản phẩm thành công'], 200);
        } else {
            return response()->json(['message' => 'Lỗi không tìm thấy sản phẩm'], 404);
        }
    }

    public function updateQuantity($product_id, $quantity, $code)
    {
        $existingProduct = Product::where('product_id', $product_id)->first();
        if ($code) {
            $existingProduct->update([
                'product_quantity' => $existingProduct->product_quantity - $quantity
            ]);

        } else {
            $existingProduct->update([
                'product_quantity' => $existingProduct->product_quantity + $quantity
            ]);

        }
        return response()->json(
            ['message' => 'Cập nhật số lượng thành công'],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($product_id)
    {
        $existingProduct = Product::where('product_id', $product_id)->first();
        if ($existingProduct) {
            $existingProduct->delete();
            return response()->json(['message' => 'xóa sản phẩm thành công'], 200);
        } else {
            return response()->json(['message' => 'Lỗi không tìm thấy sản phẩm'], 404);
        }
    }
}
