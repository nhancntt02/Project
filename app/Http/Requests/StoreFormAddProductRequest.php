<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormAddProductRequest extends FormRequest
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
            'fap_content' => 'nullable|string|max:5000',
            'fap_date_create' => 'required|date',
            //'fap_date_confirm' => 'nullable',
            'employee_id' => 'required|integer|exists:users,id',
            'fap_status' => 'required',
            'fap_total_amount' => 'integer'
        ];
    }
}
