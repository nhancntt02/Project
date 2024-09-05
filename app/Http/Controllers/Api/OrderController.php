<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Order::query()->select('*')->get();
        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        if ($request->validated()) {
            $data = $request->validated();
            $order = Order::create($data);
            return response()->json([
                'data' => $order,
                'message' => 'Order created successfully'
            ], 200);
        } else {
            return response()->json(['message' => 'Error creating order'], 400);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show($order_id)
    {
        $existOrder = Order::where('order_id', $order_id)->first();

        if ($existOrder) {
            return response()->json(['data' => $existOrder], 200);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    // Search 
    public function search($searchValue)
    {
        $data = Order::query()->select('*')->where('order_id', 'like', '%' . $searchValue . '%')->get();
        if ($data) {
            return response()->json([
                'data' => $data,
            ], 200);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }

    }

    // Show order of user

    public function showUser($user_id)
    {
        $existOrder = Order::where('user_id', $user_id)->get();

        if ($existOrder) {
            return response()->json(['data' => $existOrder], 200);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $order_id)
    {
        
            $data = $request->validate([
                'order_status' => 'string'
            ]);
            $existOrder = Order::where('order_id', $order_id)->first();
            if ($existOrder) {
                $existOrder->update($data);
                return response()->json(['message' => 'Order updated successfully'], 200);
            } else {
                return response()->json(['message' => 'Order not found'], 404);
            }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($order_id)
    {
        $existOrder = Order::where('order_id', $order_id)->first();

        if ($existOrder) {
            $existOrder->delete();
            return response()->json(['data' => $existOrder], 200);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }
}
