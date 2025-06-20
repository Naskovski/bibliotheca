import React from 'react';
import { Form, FormField } from '@/components/ui/Form';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Edit() {
    const { bookEdition, books, publishers } = usePage().props as any;

    const fields: FormField[] = [
        {
            type: 'select',
            name: 'book_id',
            label: 'Book',
            options: books.map((b: any) => ({ value: b.id, label: `${b.title} (${b.author?.name || ''})` })),
            required: true,
            searchable: true,
            value: bookEdition.book_id,
        },
        {
            type: 'select',
            name: 'publisher_id',
            label: 'Publisher',
            options: publishers.map((p: any) => ({ value: p.id, label: p.name })),
            required: true,
            searchable: true,
            value: bookEdition.publisher_id,
        },
        { type: 'text', name: 'isbn', label: 'ISBN', required: true, value: bookEdition.isbn },
        { type: 'date', name: 'published_date', label: 'Published Date', required: true, value: bookEdition.published_date },
        { type: 'text', name: 'photo_url', label: 'Photo URL', value: bookEdition.photo_url },
    ];

    const handleSubmit = (data: any) => {
        router.put(`/book-editions/${bookEdition.id}`, data);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this book edition?')) {
            router.delete(`/book-editions/${bookEdition.id}`);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-xl mx-auto mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Edit Book Edition</h1>
                    <button
                        type="button"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        onClick={handleDelete}
                    >
                        Delete Book Edition
                    </button>
                </div>
                <Form fields={fields} onSubmit={handleSubmit} submitLabel="Update Book Edition" initialValues={bookEdition} />
            </div>
        </AppLayout>
    );
}
