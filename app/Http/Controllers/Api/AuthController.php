<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Cart;
use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Validation\Rules\Password;

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

        if ($user->status_lock != 0) {
            // Nếu status_lock khác 0, trả về lỗi
            Auth::logout(); // Đăng xuất ngay lập tức
            return response([
                'message' => 'Tài khoản của bạn đã bị khóa'
            ], 403); // 403 Forbidden
        }

        // Get guest cart items (user_id = 0)
        $cartGuest = Cart::where('user_id', 0)->get();

        // Get the current user's cart items
        $cartUser = Cart::where('user_id', $user->id)->get();

        foreach ($cartGuest as $guestItem) {
            // Check if the same product_id exists in the user's cart
            $matchingUserCartItem = $cartUser->firstWhere('product_id', $guestItem->product_id);

            if ($matchingUserCartItem) {
                // If the product exists in the user's cart, increment the quantity
                $matchingUserCartItem->cart_quantity += $guestItem->cart_quantity;
                $matchingUserCartItem->save();

                // Delete the guest cart item
                $guestItem->delete();
            } else {
                // If the product does not exist, change the user_id to the logged-in user
                $guestItem->user_id = $user->id;
                $guestItem->save();
            }
        }

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
        
        if ($user->status_lock != 0) {
            // Nếu status_lock khác 0, trả về lỗi
            Auth::logout(); // Đăng xuất ngay lập tức
            return response([
                'message' => 'Tài khoản của bạn đã bị khóa'
            ], 403); // 403 Forbidden
        }
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

    public function changePassword(Request $request, $id)
    {
        $data = $request->validate([
            'passwordOld' => 'required',
            'passwordNew' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ]);
        $user = User::find($id);
        if (Hash::check($data['passwordOld'], $user->password)) {
            $user->password = Hash::make($data['passwordNew']);
            $user->save();
            return response()->json([
                'message' => 'Đổi mật khẩu thành công',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Mật khẩu cũ không đúng',
            ], 401);
        }
    }


    public function getCustomer() {
        $customer = User::where('type', 0)->whereNot('id', 0)->get();
        return response($customer, 200);
    }
}
