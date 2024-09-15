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
        $data = Order::query()->select('*')
            ->orderByRaw("
                    CASE 
                        WHEN order_status = 'Khởi tạo' THEN 1
                        WHEN order_status = 'Đã xác nhận' THEN 2
                        WHEN order_status = 'Chờ vận chuyển' THEN 3
                        WHEN order_status = 'Đang vận chuyển' THEN 4
                        WHEN order_status = 'Hoàn thành' THEN 5
                        ELSE 4
                    END
                ")
            ->get();
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
        $existOrder = Order::where('user_id', $user_id)
            ->orderByRaw("
                            CASE 
                                WHEN order_status = 'Khởi tạo' THEN 1
                                WHEN order_status = 'Đã xác nhận' THEN 2
                                WHEN order_status = 'Chờ vận chuyển' THEN 3
                                WHEN order_status = 'Đang vận chuyển' THEN 4
                                WHEN order_status = 'Hoàn thành' THEN 5
                                ELSE 4
                            END
                        ")
            ->get();

        // Kiểm tra nếu không có đơn hàng nào
        if ($existOrder->isEmpty()) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Nếu có đơn hàng, trả về kết quả
        return response()->json(['data' => $existOrder], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $order_id)
    {

        $data = $request->validate([
            'order_date_confirm' => 'required',
            'order_status' => 'string',
            'employee_id' => 'required|exists:users,id'
        ]);
        $existOrder = Order::where('order_id', $order_id)->first();
        if ($existOrder) {
            $existOrder->update($data);
            return response()->json(['message' => 'Order updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    public function updateShipper(Request $request, $order_id)
    {

        $data = $request->validate([
            'order_status' => 'string',
            'shipper_id' => 'required|exists:shippers,shipper_id'
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
