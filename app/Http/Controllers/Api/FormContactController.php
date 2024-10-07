<?php

namespace App\Http\Controllers\Api;
use App\Models\FormContact;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FormContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = FormContact::select('*')->get();
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);
        FormContact::create($data);
        return response()->json(['message' => 'Gửi form liên hệ hỗ trợ thành công'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
