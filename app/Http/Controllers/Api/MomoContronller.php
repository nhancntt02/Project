<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class MomoContronller extends Controller
{
    public function createPayment(Request $request)
    {
        // Thông tin từ MoMo Developer Dashboard
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';

        $orderInfo = "Thanh toán qua MoMo";
        $amount = (int)$request->input('amount'); // Số tiền từ client
        $orderId = time(); // Mã đơn hàng
        $requestId = time() . ""; // Mã yêu cầu
        $redirectUrl = "http://localhost:3001/payment-return";
        $ipnUrl = "http://localhost:3001/payment-notify"; // URL nhận notify từ MoMo
        $extraData = ""; // Dữ liệu bổ sung
        $requestType = "payWithATM";


        $serectkey = $secretKey;

        // Tạo dữ liệu raw signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $serectkey);


        // Dữ liệu gửi đến MoMo
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );

        // Gửi yêu cầu thanh toán đến MoMo
        $client = new Client();
        $response = $client->post($endpoint, [
            'json' => $data
        ]);

        // Xử lý phản hồi từ MoMo
        $body = json_decode($response->getBody(), true);
        return response()->json($body);



    }

    public function paymentReturn(Request $request)
    {
        // Xử lý kết quả thanh toán tại đây
        $result = $request->all();
        return view('payment-result', compact('result'));
    }

}
