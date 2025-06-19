import React from 'react';
import { Form, FormField } from '@/components/ui/Form';
import { router, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { BookEdition } from '@/types/models';

export default function Create() {
  const { books, publishers, authors } = usePage().props as any;

  const fields: FormField[] = [
    {
      type: 'select',
      name: 'book_id',
      label: 'Book',
      options: books.map((b: any) => ({ value: b.id, label: `${b.title} (${b.author?.name || ''})` })),
      required: true,
      searchable: true,
    },
    {
      type: 'select',
      name: 'publisher_id',
      label: 'Publisher',
      options: publishers.map((p: any) => ({ value: p.id, label: p.name })),
      required: true,
      searchable: true,
    },
    { type: 'text', name: 'isbn', label: 'ISBN', required: true },
    { type: 'date', name: 'published_date', label: 'Published Date', required: true },
    { type: 'text', name: 'photo_url', label: 'Photo URL' },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Book Editions', href: '/books' },
    { title: 'Create', href: '' },
  ];

  const handleSubmit = (data: any) => {
    router.post('/book-editions', data);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Book Edition" />
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Create Book Edition</h1>
        <Form fields={fields} onSubmit={handleSubmit} submitLabel="Create Book Edition" />
      </div>
    </AppLayout>
  );
}
