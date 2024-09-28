<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permiss;
use App\Models\InfoPermiss;

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

    public function addinfopermiss(Request $request)
    {
        $data = $request->validate([
            'permiss_id' => 'required|string|exists:permiss,permiss_id',
            'employee_id' => 'required|exists:users,id',
        ]);

        $rs = InfoPermiss::create($data);

        return response("Create new infopermiss value success", 200);
    }

    public function updatePermiss($request)
    {
        $data = $request->validated();
        InfoPermiss::update($data);
        return response("Update permiss value success", 200);
    }

    public function updateInfoPermiss(Request $request, $employee_id)
    {
        $data = $request->validate([
            'permiss_id' => 'required|string|exists:permiss,permiss_id',
        ]);
        InfoPermiss::where('employee_id', $employee_id)->update($data);
        return response("Update permiss value success", 200);
    }

    public function getpermiss() {
        $permiss = Permiss::query()->select('*')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $permiss
        ]);
    }

    

    public function getinfopermiss() {
        $infopermiss = InfoPermiss::query()->select('*')->get();
        return response()->json(
            [
                'data' => $infopermiss
            ]
        );
    }
    public function getOneInfoPermiss($employee_id){
        $infopermiss = InfoPermiss::query()->select('*')->where('employee_id', $employee_id)->first();
        return response()->json(['data' => $infopermiss], 200);
    }

    public function getEmployee()
    {
        $employees = InfoPermiss::with(['employee', 'permiss']) // Dùng mảng để nạp quan hệ
                    ->whereHas('employee', function ($query) {
                        $query->where('type', 1); // Thêm dấu chấm phẩy ở cuối dòng
                    })->get();
        
        return response()->json([
            'data' => $employees
        ], 200);
    }
    
}
