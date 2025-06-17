<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        Log::info('Checking authorization for lease request', [
            'client_id' => auth()->id(),
        ]);
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        Log::info('Validating lease request', [
            'client_id' => auth()->id(),
            'book_edition_id' => $this->book_edition_id,
        ]);
        return [
            'book_edition_id' => ['required', 'exists:book_editions,id'],
        ];
    }
}
