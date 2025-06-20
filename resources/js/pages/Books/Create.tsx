import React from 'react';
import { Form, FormField } from '@/components/ui/Form';
import { router, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Author } from '@/types/models';

export default function Create() {
    const { authors } = usePage().props as { authors: Author[] };

    const fields: FormField[] = [
        { type: 'text', name: 'title', label: 'Title', required: true },
        { type: 'date', name: 'first_published_date', label: 'First Published Date' },
        {
            type: 'select',
            name: 'author_id',
            label: 'Author',
            options: authors.map((a) => ({ value: a.id, label: a.name })),
            required: true,
            searchable: true,
        },
        { type: 'textarea', name: 'description', label: 'Description' },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Books', href: '/books' },
        { title: 'Create', href: '' },
    ];

    const handleSubmit = (data: any) => {
        router.post('/books', data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Book" />
            <div className="max-w-xl mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Create Book</h1>
                <Form fields={fields} onSubmit={handleSubmit} submitLabel="Create Book" />
            </div>
        </AppLayout>
    );
}
