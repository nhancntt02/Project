<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
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
        $data = $request->validate([
            'address_note' => 'string',
            'address_phuong' => 'required|string',
            'address_quan' => 'required|string',
            'address_tinh' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        Address::create([
            'address_note' => $data['address_note'],
            'address_phuong' => $data['address_phuong'],
            'address_quan' => $data['address_quan'],
            'address_tinh' => $data['address_tinh'],
            'user_id' => $data['user_id']
        ]);

        return response()->json([
            'message' => 'Tạo địa chỉ thành công'
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show($address_id)
    {
        $address = Address::find($address_id);

        if ($address) {
            return response()->json([
                'data' => $address
            ], 200);
        } else {
            return response()->json([
                'message' => 'Địa chỉ không tồn tại'
            ], 404);
        }
    }

    public function showUser($user_id)
    {
        $address = Address::where('user_id', $user_id)->get();

        if ($address) {
            return response()->json([
                'data' => $address
            ], 200);
        } else {
            return response()->json([
                'message' => 'Địa chỉ không tồn tại'
            ], 404);
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($address_id)
    {
        $address = Address::find($address_id);

        if ($address) {
            $address->delete();
            return response()->json([
                'message' => 'Xóa địa chỉ thành công'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Địa chỉ không tồn tại'
            ], 404);
        }

    }
}
