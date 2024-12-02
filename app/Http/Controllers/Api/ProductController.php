<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\DetailForm;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data = Product::with('brand')->get();

        return response([
            'data' => $data,
        ], 200);

    }

    public function fetProduct(){
        
        $data = Product::with('brand')->whereNot("product_status", "Sản phẩm đã xóa")->get();

        return response()->json($data, 200);
    }

    public function getNameProduct () {
        $data = Product::select('*' )->get();
        return response($data, 200);
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
        $products = Product::with('cpu')->with('ram')->with('rom')
            ->with('cam')->with('brand')->with('os')
            ->with('pin')->with('screen')
            ->where('product_id', $product_id)
            ->get();

        return response()->json(['data' => $products], 200);
    }


    public function getTopView()
    {
        $top6View = Product::orderBy('view', 'desc')->whereNot("product_status", "Sản phẩm đã xóa")
            ->limit(6)
            ->get();
        return response()->json($top6View, 200);
    }


    public function search($data)
    {
        $products = Product::where('product_name', 'like', '%' . $data . '%')->whereNot("product_status", "Sản phẩm đã xóa")->get();

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

    public function updateView($product_id)
    {
        $product = Product::find($product_id);
        $product->view += 1;
        $product->save();
        return response()->json(['message' => 'Lượt xem sản phẩm tăng lên'], 200);
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


    public function updateFapQuantity($fap_id)
    {
        $data = DetailForm::query()->select('product_id', 'detail_quantity')->where('fap_id', $fap_id)->get();
        for ($i = 0; $i < $data->count(); $i++) {
            $product_id = $data[$i]->product_id;
            $quantity = $data[$i]->detail_quantity;
            $this->updateQuantity($product_id, $quantity, 0);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($product_id)
    {
        $existingProduct = Product::where('product_id', $product_id)->first();
        if ($existingProduct) {
            $existingProduct->product_status = "Sản phẩm đã xóa";
            $existingProduct->save();
            return response()->json(['message' => 'xóa sản phẩm thành công'], 200);
        } else {
            return response()->json(['message' => 'Lỗi không tìm thấy sản phẩm'], 404);
        }
    }
}
