import { BookCard } from '@/components/book-card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Index({ books }) {
    const { success } = usePage().props as { success?: string };
    const successShown = useRef(false);

    useEffect(() => {
        if (success && !successShown.current) {
            toast.success(<span className="text-green-900 dark:text-green-300">
                {success || 'Successfully completed the action!'}
            </span>);
            successShown.current = true;
        }
    }, [success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
            <section className="flex flex-wrap justify-center items-stretch gap-4 py-12">
                {books?.data?.length > 0
                    ? books.data.map((bookEdition) => <BookCard key={bookEdition.id} bookEdition={bookEdition} />)
                    : 'no books found'}
            </section>

            <div>
                <Pagination>
                    <PaginationContent className="acrylic rounded px-3">
                        {books.links.map((link, idx) => (
                            <PaginationItem key={idx}>
                                <PaginationLink
                                    isActive={link.active}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}
