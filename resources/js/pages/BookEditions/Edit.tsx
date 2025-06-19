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

    return (
        <AppLayout>
            <div className="max-w-xl mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Edit Book Edition</h1>
                <Form fields={fields} onSubmit={handleSubmit} submitLabel="Update Book Edition" initialValues={bookEdition} />
            </div>
        </AppLayout>
    );
}
