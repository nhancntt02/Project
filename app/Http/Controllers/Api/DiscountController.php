<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Discount::query()->select('*')->get();

        return response()->json([
            'data' => $data
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
        $data = $request->validate([
            'ds_name' => 'required|string',
            'ds_code' => 'required|string|unique:discounts,ds_code',
            'ds_value' => 'required|numeric',
            'ds_type' => 'required|string',
            'ds_quantity' => 'required|integer',
            'ds_start' => 'required|date',
            'ds_end' => 'required|date',
        ]);

        Discount::create($data);
        return response()->json(['message' => 'Discount created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Discount $discount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Discount $discount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $ds_id)
    {
        $data = $request->validate([
            'ds_name' => 'required|string',
            'ds_code' => 'required|string',
            'ds_value' => 'required|numeric',
            'ds_type' => 'required|string',
            'ds_quantity' => 'required|integer',
            'ds_start' => 'required|date',
            'ds_end' => 'required|date',
        ]);

        $discont = Discount::find($ds_id);
        if ($discont) {
            $discont->update($data);
            return response()->json(['message' => 'Discount updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Discount not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($ds_id)
    {
        $existDiscount = Discount::find($ds_id);
        if (!$existDiscount) {
            return response()->json(['message' => 'Discount not found'], 404);
        }
        $existDiscount->delete();
        return response()->json(['message' => 'Discount deleted successfully'], 200);

    }
}
