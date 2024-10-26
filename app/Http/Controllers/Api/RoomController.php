<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $room = Room::select('*')->get();
        return response()->json($room);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Room::create([
            'room_id' => $request->room_id,
            'user_id' => $request->user_id,
            'room_name' => $request->room_name,
        ]);

        return response()->json('Thêm vào phòng thành công', 200);
    }

    public function createRoom(Request $request)
    {
        Room::create([
            'room_id' => $request->room_id,
            'user_id' => $request->user_id,
            'room_name' => $request->room_name,
            'room_key' => $request->room_key
        ]);

        return response()->json('Thêm vào phòng thành công', 200);
    }
    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $room = Room::where('user_id', $user_id)->get();
        return response()->json($room, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
