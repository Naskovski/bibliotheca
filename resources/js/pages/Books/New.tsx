import type { BreadcrumbItem } from '@/types';
import { Author } from '@/types/models';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'New a book',
        href: '/books/new',
    },
];
export default function New() {
    const { authors } = usePage<{ authors: Author[] }>().props;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        first_published_date: '',
        author_id: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/books');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New a book" />
            <div>
                <h1>New Book</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                        {errors.title && <span>{errors.title}</span>}
                    </div>
                    <div>
                        <label>First Published Date:</label>
                        <input type="date" value={data.first_published_date} onChange={(e) => setData('first_published_date', e.target.value)} />
                        {errors.first_published_date && <span>{errors.first_published_date}</span>}
                    </div>
                    <div>
                        <label>Author:</label>
                        <select value={data.author_id} onChange={(e) => setData('author_id', e.target.value)} required>
                            <option value="">Select Author</option>
                            {authors && authors.map((author) => <option value={author.id}>{author.name}</option>)}
                        </select>
                        {errors.author_id && <span>{errors.author_id}</span>}
                    </div>
                    <button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'New'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
