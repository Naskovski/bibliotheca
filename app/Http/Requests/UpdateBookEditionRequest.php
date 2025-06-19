<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookEditionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'librarian';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'book_id' => ['required', 'exists:books,id'],
            'publisher_id' => ['required', 'exists:publishers,id'],
            'isbn' => ['required', 'string', 'unique:book_editions,isbn'],
            'published_date' => ['required', 'date'],
            'photo_url' => ['nullable', 'string'],
        ];
    }
}
