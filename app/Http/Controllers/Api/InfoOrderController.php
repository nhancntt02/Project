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
    // serch 
    public function search($searchValue, $userId)
    {
        $data = InfoOrder::select('order_id')->with('product:product_id,product_name')->with('order:order_id,user_id')
            ->whereHas('product', function ($query) use ($searchValue) {
                $query->where('product_name', 'like', '%' . $searchValue . '%'); 
            })->whereHas('order', function ($query) use ($userId) {
                $query->where('user_id', $userId); 
            })
            ->distinct()->get();

        return response()->json(['data' => $data], 200);
    }

    public function searchAdmin($searchValue)
    {
        $data = InfoOrder::select('order_id')->with('product:product_id,product_name')
            ->whereHas('product', function ($query) use ($searchValue) {
                $query->where('product_name', 'like', '%' . $searchValue . '%'); 
            })
            ->distinct()->get();

        return response()->json(['data' => $data], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($order_id)
    {
        $data = InfoOrder::with('product:product_id,product_name,product_price')->where('order_id', $order_id)->get();

        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function priceProducts(){
        $data = InfoOrder::query()->select('product_id',InfoOrder::raw('SUM(io_quantity) AS total_quantity'), InfoOrder::raw('SUM(io_quantity * io_price) AS total_price'))->groupBy('product_id')->get();
        return response()->json(['data' => $data], 200);
    }
    public function priceProduct($product_id){
        $data = InfoOrder::query()->select('product_id', InfoOrder::raw('SUM(io_quantity * io_price) AS total_price'))->where('product_id', $product_id)->groupBy('product_id')->get();
        return response()->json(['data' => $data], 200);
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

    public function quantityProduct() 
    {
        $data = InfoOrder::query()->select(InfoOrder::raw('SUM(io_quantity) AS total_quantity'))->get();
        return response()->json(['data' => $data], 200);
    }

    public function quantityProductOrder($order_id) 
    {
        $data = InfoOrder::query()->select(InfoOrder::raw('SUM(io_quantity) AS total_quantity'))->where('order_id', $order_id)->get();
        return response()->json($data, 200);
    }

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

    public function deleteOrder($order_id)
    {
        $infoOrder = InfoOrder::where('order_id', $order_id)->delete();
        if ($infoOrder) {
            return response()->json(['message' => 'Xoa thanh cong'], 200);
        }
    }
}
