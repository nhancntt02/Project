<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permiss;
use App\Models\InfoPermiss;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PermissController extends Controller
{

    public function addpermiss(Request $request){
        $data = $request->validate([
            'permiss_id' => 'required|string|unique:permiss,permiss_id',
            'permiss_name' => 'required|string|max:255|unique:permiss,permiss_name',

        ]);

        $rs = Permiss::create([
            'permiss_id' => $data['permiss_id'],
            'permiss_name' => $data['permiss_name'],
        ]);

        return response("Create new permiss value success", 204);
    }

    public function addinfopermiss(Request $request, $employee_id)
    {
        $data = $request->validate([
            'permiss_id' => 'required|string|exists:permiss,permiss_id',
            'employee_id' => 'required|exists:users,id',
            'infopermiss_value' => 'required|string|max:500'

        ]);



        $results = InfoPermiss::query()->select('permiss_id')->where('employee_id', $employee_id)->get();
        if (!$results) {
            return response()->json(['message', 'Không có nhân viên này'], 404);
        } 
        $hasPermission = $results->contains('permiss_id', 'QMAX');

        if (!$hasPermission) {
            return response()->json(['message', 'Nhân viên không có quyền này'], 404);
        } 

        $rs = InfoPermiss::create([
            'permiss_id' => $data['permiss_id'],
            'employee_id' => $data['employee_id'],
            'infopermiss_value' => $data['infopermiss_value']
        ]);

        return response("Create new infopermiss value success", 204);
    }
}
