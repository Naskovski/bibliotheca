import { BookCard } from '@/components/book-card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Index({ books }) {
    useEffect(() => {
        console.log('Books:', books);
    }, [books]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
            <section className="flex flex-wrap justify-center gap-4 py-12">
                {books?.data?.length > 0
                    ? books.data.map((bookEdition) => <BookCard key={bookEdition.id} bookEdition={bookEdition} />)
                    : 'no books found'}
            </section>
            <nav className="mt-8 flex gap-2">
                {books.links.map((link, idx) => (
                    <button
                        key={idx}
                        disabled={!link.url}
                        className={`rounded px-3 py-1 ${link.active ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                        onClick={() => link.url && router.visit(link.url)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </nav>
        </AppLayout>
    );
}
