<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InfoOrder;
use Illuminate\Http\Request;

class InfoOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                'order_id' => 'required|exists:orders,order_id',
                'product_id' => 'required|string|exists:products,product_id',
                'io_quantity' => 'required|integer',
                'io_price' => 'required|numeric',
            ]);

            InfoOrder::create($data);

            return response()->json(['message' => 'Them thong tin thanh cong'], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($order_id)
    {
        $data = InfoOrder::where('order_id', $order_id)->get();

        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|exists:orders,order_id',
            'product_id' => 'required|string|exists:products,product_id',
            'io_quantity' => 'required|integer',
        ]);
        $existsInfoOrder = InfoOrder::where('order_id', $data['order_id'])->where('product_id', $data['product_id'])->first();
        if ($existsInfoOrder) {
            $existsInfoOrder->update($data);
            return response()->json(['message' => 'Cap nhat thanh cong'], 200);
        } else {
            return response()->json(['message' => 'Khong tim thay'], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($order_id, $product_id)
    {
        $infoOrder = InfoOrder::where('order_id', $order_id)->where('product_id', $product_id)->first();
        if ($infoOrder) {
            $infoOrder->delete();
            return response()->json(['message' => 'Xoa thanh cong'], 200);
        } else {
            return response()->json(['message' => 'Khong tim thay'], 404);
        }
    }

    public function deleteOrder($order_id){
        $infoOrder = InfoOrder::where('order_id', $order_id)->delete();
        if ($infoOrder) {
            return response()->json(['message' => 'Xoa thanh cong'], 200);
        }    
    }
}