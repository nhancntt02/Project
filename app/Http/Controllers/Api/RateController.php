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
        $ratings = Rate::query()->select('*')->get();

        return response()->json([
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
                'product_id' => 'required|string|exists:products,product_id',
                'rate_rating' => 'required|integer|between:1,5',
                'rate_comment' => 'nullable|string',
            ]);

            Rate::create($data);

            return response()->json(['message' => 'Đánh giá thành công'], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Rate $rate)
    {
        //
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
