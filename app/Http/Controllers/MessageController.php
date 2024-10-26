<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'user_id' => $request->user()->id,
            'message' => $request->message,
            'rom_id' => $request->rom_id
        ]);
        $message->load('user');
        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'status' => 'Message Sent!',
            'message' => $message
        ]);
    }

    public function fetchMessages()
    {
        return Message::with('user')->get();
    }
}
