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

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this book?')) {
      router.delete(`/books/${book.id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Book" />
      <div className="max-w-xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Edit Book</h1>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Delete Book
          </button>
        </div>
        <Form fields={fields} onSubmit={handleSubmit} submitLabel="Update Book" initialValues={book} />
      </div>
    </AppLayout>
  );
}

