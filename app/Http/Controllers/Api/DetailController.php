<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DetailForm;

class DetailController extends Controller
{


    public function index()
    {
        $data = DetailForm::query()->select('*')->get();

        return response([
            'data' => $data,
        ], 201);
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'fap_id' => 'required|integer|exists:form_add_products,fap_id',
            'product_id' => 'required|string|exists:products,product_id',
            'detail_quantity' => 'required|integer',
            'detail_price' => 'required|numeric',
        ]);

        $result = DetailForm::create([
            'fap_id' => $data['fap_id'],
            'product_id' => $data['product_id'],
            'detail_quantity' => $data['detail_quantity'],
            'detail_price' => $data['detail_price'],
        ]);

        return response()->json(['message' => 'Thêm chi tiết phiếu nhập thành công'], 201);

    }

    public function show($fap_id)
    {
        $data = DetailForm::query()->where('fap_id', $fap_id)->get();
        return response([
            'data' => $data,
        ], 201);
    }

    public function getQuantityProduct()
    {
        $data = DetailForm::query()->select('product_id', \DB::raw('SUM(detail_quantity) as total_quantity'))->groupBy('product_id')->get();

        return response()->json([
            'data' => $data,
        ], 201);
    }

    // public function updateQuantity($product_id, $quantity)
    // {
    //     // Lấy dữ liệu sản phẩm với điều kiện product_id và detail_quantity > 0
    //     $data = DetailForm::query()->where('product_id', $product_id)->where('detail_quantity', '>', 0)->first();

    //     // Kiểm tra nếu tìm thấy dữ liệu
    //     if ($data) {
    //         $value = $quantity - $data->detail_quantity;

    //         if ($value <= 0)
    //             $data->update(['detail_quantity' => $data->detail_quantity - $quantity]);
    //         else {
    //             $data->update(['detail_quantity' => 0]);
    //             $this->updateQuantity($product_id, $value);
    //         }

    //         return response([
    //             'data' => 'updating success',
    //         ], 201);

    //     } else {
    //         return response([
    //             'error' => 'Product not found or quantity is zero',
    //         ], 404);
    //     }
    // }

}