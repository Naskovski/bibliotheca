import React from 'react';
import { Form, FormField } from '@/components/ui/Form';
import { router, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Books', href: '/books' },
  { title: 'Edit Book', href: '' },
];

export default function Edit() {
  const { book, authors } = usePage().props as any;

  const fields: FormField[] = [
    { type: 'text', name: 'title', label: 'Title', value: book.title, required: true },
    { type: 'date', name: 'first_published_date', label: 'First Published Date', value: book.first_published_date },
    {
      type: 'select',
      name: 'author_id',
      label: 'Author',
      options: authors.map((a: any) => ({ value: a.id, label: a.name })),
      value: book.author_id,
      required: true,
      searchable: true,
    },
    { type: 'textarea', name: 'description', label: 'Description', value: book.description },
  ];

  const handleSubmit = (data: any) => {
    router.put(`/books/${book.id}`, data);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Book" />
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
        <Form fields={fields} onSubmit={handleSubmit} submitLabel="Update Book" initialValues={book} />
      </div>
    </AppLayout>
  );
}

