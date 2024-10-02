<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */

        $user = User::create($data);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function register(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'phone' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tạo người dùng mới
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        // Gửi sự kiện đã đăng ký
        event(new Registered($user));

        // Trả về phản hồi
        return response()->json(['message' => 'Registration successful! Please check your email for verification.']);
    }

    public function verifyEmail(EmailVerificationRequest $request)
    {
        $request->fulfill();

        return redirect()->route('home')->with('verified', true);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Địa chỉ email hoặc mật khẩu không đúng'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function loginEmployee(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
            'type' => 'required||in:1'
        ]);
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Địa chỉ email hoặc mật khẩu không đúng'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('Logout success', 204);
    }

    public function getUser()
    {
        $users = User::query()->select('*')->get();

        return response()->json([
            'users' => $users
        ], 201);
    }

    public function getQuantityUser()
    {
        // Đếm số lượng user có type == 0
        $type0Count = User::where('type', 0)->count();
    
        // Đếm số lượng user có type == 1
        $type1Count = User::where('type', 1)->count();
    
        return response()->json([
            'customer' => $type0Count,
            'employee' => $type1Count
        ], 200);  // Trả về mã trạng thái 200 cho thành công
    }
    

    public function getOneUser($id)
    {
        $user = User::query()->select('*')->find($id);
        if ($user) {
            return response([
                'data' => $user
            ], 201);
        }
    }



    public function updateUser(Request $request, $id)
    {
        $user = User::where('id', $id)->first();

        if ($user) {
            $user->update($request->all());
            return response()->json([
                'message' => 'User updated successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }
    }
}
