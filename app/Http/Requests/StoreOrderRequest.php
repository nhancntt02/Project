<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order_date_create' => 'required|date',
            'order_product_money'=> 'required|integer',
            'order_transport_money' => 'nullable|integer',
            'order_discount_money'=> 'nullable|numeric',
            'order_total_money'=> 'required|numeric',
            'order_status' => 'required|string',
            'address_id' => 'required|exists:address,address_id',
            'user_id' => 'required|exists:users,id',
            'payment_id' => 'required|string|exists:payment,payment_id',
            'ds_id' => 'nullable',
            'shipper_id' => 'nullable|exists:shippers,shipper_id',
        ];
    }
}

