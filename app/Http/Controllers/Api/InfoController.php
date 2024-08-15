<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Payment;
use App\Models\Cpu;
use App\Models\Ram;
use App\Models\Rom;
use App\Models\Pin;
use App\Models\OS;
use App\Models\Cam;
use App\Models\Screen;
use App\Models\Supplier;
use Illuminate\Http\Request;


class InfoController extends Controller
{
    public function addbrand(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|string|max:255|unique:rams,id',
            'brand_name' => 'required|string|max:255',
        ]);

        $rs = Brand::create([
            'id' => $data['id'],
            'brand_name' => $data['brand_name'],
        ]);

        return response()->json(['message' => 'Brand created successfully'], 201);
    }
    // Them phuoc thuc thanh toan
    public function addpayment(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|integer|unique:payment,id',
            'payment_name' => 'required|string|max:255|unique:payment,payment_name',

        ]);

        $rs = Payment::create([
            'id' => $data['id'],
            'payment_name' => $data['payment_name'],
        ]);

        return response("", 204);
    }
    // Them chip xu li
    public function addcpu(Request $request)
    {
        $data = $request->validate([
            'cpu_id' => 'required|string|unique:cpus,cpu_id',
            'cpu_value' => 'required|string|max:255|unique:cpus,cpu_value',

        ]);

        $rs = Cpu::create([
            'cpu_id' => $data['cpu_id'],
            'cpu_value' => $data['cpu_value'],
        ]);

        return response()->json(['message' => 'Cpu created successfully'], 201);
    }
    public function getcpu(Request $request)
    {

        $cpus = Cpu::query()->select('*')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $cpus
        ]);
    }
    // Them du lieu ram
    public function addram(Request $request)
    {
        $data = $request->validate([
            'ram_id' => 'required|string|unique:rams,ram_id',
            'ram_value' => 'required|string|max:255|unique:rams,ram_value',

        ]);

        $rs = Ram::create([
            'ram_id' => $data['ram_id'],
            'ram_value' => $data['ram_value'],
        ]);

        return response()->json([
            'message' => 'Create new ram value success',
            'data' => $rs,
        ], 201);
    }
    public function getram(Request $request)
    {

        $rams = Ram::query()->orderBy('ram_id', 'asc')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $rams
        ]);
    }
    // Thêm dữ liệu cho rom
    public function addrom(Request $request)
    {
        $data = $request->validate([
            'rom_id' => 'required|string|unique:roms,rom_id',
            'rom_value' => 'required|string|max:255|unique:roms,rom_value',

        ]);

        $rs = Rom::create([
            'rom_id' => $data['rom_id'],
            'rom_value' => $data['rom_value'],
        ]);

        return response()->json(['message' => 'Rom created successfully'], 201);
    }
    public function getrom(Request $request)
    {

        $roms = Rom::query()->select('*')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $roms
        ]);
    }
    // Them du lieu cho pin
    public function addpin(Request $request)
    {
        $data = $request->validate([
            'pin_id' => 'required|string|unique:pins,pin_id',
            'pin_value' => 'required|string|max:255|unique:pins,pin_value',

        ]);

        $rs = Pin::create([
            'pin_id' => $data['pin_id'],
            'pin_value' => $data['pin_value'],
        ]);

        return response()->json(['message' => 'Pin created successfully'], 201);
    }
    public function getpin()
    {

        $pins = Pin::query()->orderBy('pin_value', 'asc')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $pins
        ]);
    }
    // Them du lieu cho man hinh
    public function addscreen(Request $request)
    {
        $data = $request->validate([
            'screen_id' => 'required|string|unique:screens,screen_id',
            'screen_value' => 'required|string|max:255|unique:screens,screen_value',

        ]);

        $rs = Screen::create([
            'screen_id' => $data['screen_id'],
            'screen_value' => $data['screen_value'],
        ]);

        return response()->json(['message' => 'Screen created successfully'], 201);
    }
    public function getscreen(Request $request)
    {

        $screens = Screen::query()->select('*')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $screens
        ]);
    }
    // Them du lieu cho he dieu hanh
    public function addos(Request $request)
    {
        $data = $request->validate([
            'os_id' => 'required|string|unique:operation_systems,os_id',
            'os_value' => 'required|string|max:255|unique:operation_systems,os_value',

        ]);

        $rs = OS::create([
            'os_id' => $data['os_id'],
            'os_value' => $data['os_value'],
        ]);

        return response()->json(['message' => 'Operating system created successfully'], 201);
    }
    public function getos(Request $request)
    {

        $oss = OS::query()->select('*')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $oss
        ]);
    }
    // Them du lieu cho camera
    public function addcamera(Request $request)
    {
        $data = $request->validate([
            'cam_id' => 'required|string|unique:cams,cam_id',
            'cam_value' => 'required|string|max:255|unique:cams,cam_value',

        ]);

        $rs = Cam::create([
            'cam_id' => $data['cam_id'],
            'cam_value' => $data['cam_value'],
        ]);

        return response()->json(['message' => 'Camera created successfully'], 201);
    }
    public function getcamera(Request $request)
    {

        $cams = Cam::query()->select('*')->get();

        // Return a JSON response with the data
        return response()->json([
            'data' => $cams
        ]);
    }

    // Lấy dữ liệu của nhà cung cấp - Supplier
    public function getsuppliers()
    {
        $suppliers = Supplier::query()->select('*')->get();
        return response()->json([
            'data' => $suppliers
        ], 201);
    }
    // Tạo mới nhà cung cấp
    public function addsupplier(Request $request)
    {
        $data = $request->validate([
            'supplier_id' => 'required|string|unique:suppliers,supplier_id',
            'supplier_name' => 'required|string|max:255',
            'supplier_email' => 'required|string|email|unique:suppliers,email',
            'supplier_phone' => 'required|string|unique:suppliers,phone',
            'supplier_address' => 'required|string',
        ]);
        $rs = Supplier::create([
            'supplier_id' => $data['supplier_id'],
            'supplier_name' => $data['supplier_name'],
            'supplier_email' => $data['supplier_email'],
            'supplier_phone' => $data['supplier_phone'],
            'supplier_address' => $data['supplier_address'],
        ]);
        return response()->json(['message' => 'Thêm thông tin nhà cung cấp thành công'], 201);
    }

    
}
