<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\FormAddProduct;
use App\Http\Requests\StoreFormAddProductRequest;
use App\Http\Requests\UpdateFormAddProductRequest;

class FormAddController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = FormAddProduct::query()->select('*')->get();
        return response()->json([
            'data' => $data,
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormAddProductRequest $request)
    {
        $data = $request->validated();
        if($data) {
            $formAddProduct = FormAddProduct::create($data);
            return response()->json([
                'message' => 'Thêm sản phẩm thành công',
                'data' => $formAddProduct
            ], 201);
        } else {
            return response([
                'message' => 'Co loi xay ra'
            ], 422);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show($fap_id)
    {
        $data = FormAddProduct::query()->where('fap_id', $fap_id)->get();

        if($data) {
            return response()->json([
                'data' => $data,
                ], 201);
        } else {
            return response([
                'message' => 'Không tìm thấy dữ liệu'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormAddProductRequest $request, $fap_id)
    {
        $validatedData = $request->validated();
        $form_add_product = FormAddProduct::where('fap_id', $fap_id)->first(); 

        if ($form_add_product) {
            $form_add_product->update($validatedData);
            return response()->json(['message' => 'Cập nhật phiếu nhập thành công'], 201);
        } else {
            return response()->json(['message' => 'Lỗi không tìm thấy phiếu nhập'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $fap_id)
    {
        $form_add_product = FormAddProduct::where('fap_id', $fap_id)->first();
        if ($form_add_product) {
            $form_add_product->delete();
            return response()->json(['message' => 'Xóa phiếu nhập thành công'], 201);
        } else {
            return response()->json(['message' => 'Lỗi không tìm thấy phiếu nhập'], 404);
        }
    }
}
