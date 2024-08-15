<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFormAddProductRequest extends FormRequest
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
            'fap_content' => 'required|string|max:5000',
            'fap_date_confirm' => 'nullable',
            'employee_id' => 'required|integer|exists:users,id',
            'supplier_id' => 'string',
            'fap_status' => 'required|integer',
            'fap_total_amount' => 'required|integer'
        ];
    }
}
