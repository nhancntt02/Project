<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permiss;
use App\Models\InfoPermiss;

class PermissController extends Controller
{
    //
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

    public function addinfopermiss(Request $request){
        $data = $request->validate([
            'permiss_id' => 'required|string|unique:permiss,permiss_id',
            'employee_id' => 'required|string|unique:employee,employee_id',
            'infopermiss_value' => 'required|string|max:500'

        ]);

        $rs = InfoPermiss::create([
            'permiss_id' => $data['permiss_id'],
            'employee_id' => $data['employee_id'],
            'infopermiss_value' => $data['infopermiss_value']
        ]);

        return response("Create new infopermiss value success", 204);
    }
}
