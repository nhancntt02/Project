<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notify;
use App\Models\User;
use Illuminate\Http\Request;

class NotifyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Notify::query()->select('notify_title', 'notify_content')->distinct()->get();
        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $notify = $request->validate([
                'notify_title' => 'required',
                'notify_content' => 'required',
                'notify_status' => 'required|in:0,1',
            ]);

            $users = User::select('id')->get();

            foreach ($users as $user) {
                Notify::create([
                    'user_id' => $user->id,
                    'notify_title' => $notify['notify_title'],
                    'notify_content' => $notify['notify_content'],
                    'notify_status' => $notify['notify_status'],
                ]);
            }

            return response()->json(['message' => 'Notifications created successfully.'], 201);
        } catch (\Exception $e) {
            // Log the error message
            \Log::error('Error creating notifications: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while creating notifications.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $data = Notify::where('user_id', $user_id)->get();
        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notify $notify)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($notify_id)
    {
        $notify = Notify::where('notify_id', $notify_id)->first();
        if ($notify) {
            $notify->delete();
            return response()->json([
                'message' => 'success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'fail',
            ], 404);
        }
    }
}
