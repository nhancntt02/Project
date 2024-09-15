<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shipper;
use Illuminate\Http\Request;

class ShipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Shipper::select("*")->get();
        return response()->json([
            'data' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    public function login(Request $request)
    {
        $data = $request->all();

        $existShipper = Shipper::where('shipper_phone', $data['shipper_phone'])
            ->where('shipper_password', $data['shipper_password'])
            ->first();
        if ($existShipper) {
            return response()->json([
                'message' => 'Login Success',
                'data' => $existShipper,
            ]);
        } else {
            return response()->json([
                'message' => 'Login Failed',
                'data' => null,
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'shipper_name' => 'required',
            'shipper_phone' => 'required|unique:shippers,shipper_phone',
            'shipper_address' => 'required',
        ]);

        Shipper::create($data);

        return response()->json([
            'message' => 'Shipper created successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($shipper_id)
    {
        $shipper = Shipper::find($shipper_id);
        if ($shipper) {
            return response()->json([
                'message' => 'Shipper found',
                'data' => $shipper,
            ]);
        } else {
            return response()->json([
                'message' => 'Shipper not found',
                'data' => null,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipper $shipper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shipper $shipper)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipper $shipper)
    {
        //
    }
}
