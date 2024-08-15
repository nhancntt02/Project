<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'product_name' => 'required|string|max:500',
            'product_description' => 'required|string|max:2000',
            'product_price' => 'required|integer',
            'product_status' => 'required|string|max:255',
            'brand_id' => 'required|string|max:255|exists:brands,brand_id',
            'cpu_id' => 'required|string|max:255|exists:cpus,cpu_id',
            'ram_id' => 'required|string|max:255|exists:rams,ram_id',
            'rom_id' => 'required|string|max:255|exists:roms,rom_id',
            'os_id' => 'required|string|max:255|exists:operation_systems,os_id',
            'screen_id' => 'required|string|max:255|exists:screens,screen_id',
            'pin_id' => 'required|string|max:255|exists:pins,pin_id',
            'cam_id' => 'required|string|max:255|exists:cams,cam_id',
        ];
    }
}
