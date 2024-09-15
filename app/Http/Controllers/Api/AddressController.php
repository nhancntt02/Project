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
        $data = Address::select('*')->get();
        return response()->json($data);
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
            'user_id' => 'required|exists:users,id',
            'address_primary' => 'required|in:0,1',
            'address_phone' => 'required|string|min:10|max:11'
        ]);

        Address::create($data);

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
        $address = Address::where('user_id', $user_id)->orderBy('address_primary', 'desc')->get();

        if ($address->count() > 0) {
            return response()->json([
                'data' => $address
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không có địa chỉ này'
            ], 201);
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
    public function update(Request $request, $address_id)
    {
        $data = $request->validate([
            'address_note' => 'string',
            'address_phuong' => 'required|string',
            'address_quan' => 'required|string',
            'address_tinh' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'address_primary' => 'required|in:0,1',
            'address_phone' => 'required|string|min:10|max:11'
        ]);

        if ($data['address_primary'] == 1) {
            // Find the existing primary address for the user
            $existingPrimaryAddress = Address::where('address_primary', 1)
                ->where('user_id', $data['user_id'])
                ->where('address_id', '!=', $address_id)
                ->first();

            // If there is an existing primary address, set it to not primary
            if ($existingPrimaryAddress) {
                $existingPrimaryAddress->update(['address_primary' => 0]);
            }
        }

        $address = Address::find($address_id);
        if ($address) {
            $address->update($data);
        } else {
            // Handle case where address does not exist
            return response()->json(['message' => 'Address not found'], 404);
        }

        return response()->json(['message' => 'Address updated successfully']);
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
