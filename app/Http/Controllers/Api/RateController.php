<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use Illuminate\Http\Request;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ratings = Rate::with(['customer', 'product:product_id,product_name'])->get();

        return response()->json([
            'data' => $ratings,
        ], 200);
    }

    public function search($searchValue) {
        $ratings = Rate::with(['customer', 'product:product_id,product_name'])
        ->whereHas('product', function ($query) use ($searchValue) {
            $query->where('product_name', 'like', '%' . $searchValue . '%'); 
        })->get();
        
        return response([
            'data' => $ratings,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            $data = $request->validate([
                'user_id' => 'required|exists:users,id',
                'order_id' => 'required|exists:orders,order_id',
                'product_id' => 'required|string|exists:products,product_id',
                'rate_rating' => 'required|integer|between:1,5',
                'rate_comment' => 'nullable|string',
                'cmt_status' => 'nullable',
                'rate_date' => 'nullable|date'
            ]);

            $rart = Rate::create($data);

            return response()->json(['message' => 'Đánh giá thành công','data' => $rart,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Display the specified resource.
     */

    public function show() {

    }
    public function showO($order_id)
    {
        $data = Rate::query()->where('order_id', $order_id)->get();
        if($data) {
            return response()->json([
                'data' => $data,
                ], 200);
        } else {
            return response()->json([
                'message' => 'Không có đánh giá nào thuộc đơn hàng',
                ], 404);
        }
    }

    public function showP($product_id)
    {
        $data = Rate::with('customer')->where('product_id', $product_id)->get();
        if($data) {
            return response()->json([
                'data' => $data,
                ], 200);
        } else {
            return response()->json([
                'message' => 'Không có đánh giá nào của sản phẩm',
                ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rate $rate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rate $rate)
    {
        //
    }

    // delete with rate_id

    public function delete($rate_id)
    {
        $existRate = Rate::find($rate_id);
        if($existRate) {
            $existRate->delete();
            return response()->json([
                'message' => 'Đánh giá đã bị xóa',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Đánh giá không tồn tại',
            ], 404);
        }
    }

    public function filterComment(Request $request){
        $id = $request->input('rate_id');
        $rate = Rate::find($id);
        if($rate){
            $rate->cmt_status = $request->input('status');
            $rate->save();
            return response('',200);
        } else {
            return response('',404);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($product_id, $user_id)
    {
        $existRate = Rate::where('product_id', $product_id)
            ->where('user_id', $user_id)
            ->first();
        if ($existRate) {
            $existRate->delete();
            return response()->json([
                'message' => 'Xóa đánh giá thành công'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy đánh giá'
            ], 404);
        }
    }
}
