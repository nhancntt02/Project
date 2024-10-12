<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store($user_id, Request $request)
    {
        $fName = File::query()->where('user_id', $user_id)->first();
        if ($fName) {
            $fName->delete();
        }

        // Store the uploaded file
        $file = $request->file('file');

        if ($file) {
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $destinationPath = 'avatars';
            try {
                $file->storeAs($destinationPath, $fileName, 'public');

                // Store file information in the database
                $uploadedFile = new File();
                $uploadedFile->file_name = $fileName;
                $uploadedFile->user_id = $user_id;
                $uploadedFile->save();

                // Return a JSON response with success message
                return response()->json(['message' => "File uploaded successfully.", 'file_name' => $fileName], 200);
            } catch (\Exception $e) {
                // Return a JSON response with error message
                return response()->json(['message' => "Failed to upload the file.", 'error' => $e->getMessage()], 500);
            }
        } else {
            // Return a JSON response if no file was uploaded
            return response()->json(['message' => "No file uploaded."], 400);
        }
    }
    public function getFileName($user_id)
    {
        $fName = File::query()->where('user_id', $user_id)->first();
        return response()->json($fName, 200);
    }

    public function getAvatar($filename)
    {
        $filePath = 'avatars/' . $filename;

        if (Storage::disk('public')->exists($filePath)) {
            return Storage::disk('public')->response($filePath);
        } else {
            return response()->json(['message' => 'File not found.'], 404);
        }
    }

    public function getFullFile()
    {
        // Lấy tất cả các tệp từ cơ sở dữ liệu
        $files = File::select('*')->get();

        // foreach ($files as $file) {
        //     // Tạo đường dẫn đến tệp
        //     $filePath = 'avatars/' . $file->file_name;

        //     // Kiểm tra xem tệp có tồn tại không
        //     if (Storage::disk('public')->exists($filePath)) {
                
        //         // Thay đổi giá trị của file_name thành nội dung tương ứng
        //         $file->file_name = $filePath; // Cập nhật file_name với nội dung tệp
        //     } else {
        //         // Nếu tệp không tồn tại, bạn có thể đặt giá trị là 'File not found' hoặc giữ nguyên
        //         $file->file_name = 'File not found'; // Cập nhật file_name nếu tệp không tồn tại
        //     }
        //}

        return response()->json(['data' => $files], 200); // Trả về danh sách các tệp đã được cập nhật
    }

    // Thêm trong FileController
    public function getFilesByEmployeeIds(Request $request)
    {
        $employeeIds = $request->input('employee_ids'); // Nhận mảng các employee_id từ request
    
        // Tìm các file tương ứng với employee_id
        $files = File::whereIn('user_id', $employeeIds)->get();
    
        $fileData = [];
    
        foreach ($employeeIds as $employeeId) {
            $file = $files->firstWhere('user_id', $employeeId); // Lấy file tương ứng với employee_id
    
            if ($file) {
                $fileData[] = [
                    'employee_id' => $employeeId,
                    'file_name' => $file->file_name, // Trả về tên file
                ];
            } else {
                $fileData[] = [
                    'employee_id' => $employeeId,
                    'file_name' => 'macdinh.jpg', // Trả về tên ảnh mặc định nếu không có file
                ];
            }
        }
    
        return response()->json($fileData, 200); // Trả về JSON chứa danh sách employee_id và tên file
    }
    


}