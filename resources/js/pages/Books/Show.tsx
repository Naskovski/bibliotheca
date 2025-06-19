import { BookCard } from '@/components/book-card';
import Scroller from '@/components/scroller';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { BookEdition, User } from '@/types/models';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from "sonner"

interface ShowProps {
    bookEdition: BookEdition;
    copies_left: number;
    otherEditionsOfBook: BookEdition[];
    otherBookEditionsByAuthor: BookEdition[];
}


const adminLinks = [
    {
        title: 'Edit Book',
        href: (bookEdition: BookEdition) => route('books.edit', bookEdition.book_id),
    },
    {
        title: 'Edit Book Edition',
        href: (bookEdition: BookEdition) => route('bookEditions.edit', bookEdition.id),
    },
    {
        title: 'Manage Book Copies',
        href: (bookEdition: BookEdition) => route('bookEditions.copies', bookEdition.id),
    }
];

export default function Show({ bookEdition, copies_left, otherEditionsOfBook, otherBookEditionsByAuthor }: ShowProps) {
    const { post, setData, processing } = useForm({ book_edition_id: bookEdition.id });
    const { auth, errors, success } = usePage().props as {
        auth: { user: User },
        errors: Record<string, string[]>,
        success?: string
    };

    const successShown = useRef(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Browse books',
            href: '/books',
        },
        {
            title: 'Details',
            href: '/book-editions/' + bookEdition.id,
        },
    ];

    useEffect(() => {
        if (errors.book) {
            toast.error(<span className="text-red-900 dark:text-red-200">
                {errors.book || 'An error occurred while processing your request.'}
            </span>)
        }
    }, [errors]);

    useEffect(() => {
        if (success && !successShown.current) {
            toast.success(<span className="text-green-900 dark:text-green-300">
                {success || 'Successfully requested the book edition.'}
            </span>);
            successShown.current = true;
        }
    }, [success]);

    const handleRequest = () => {
        setData('book_edition_id', bookEdition.id);
        post(route('leases.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={bookEdition.book.title} />
            <div className="flex h-full min-h-full w-full flex-col gap-8 md:flex-row">
                <div>
                    <div className="group relative mx-auto max-h-full w-80 overflow-hidden rounded-xl shadow-md">
                        <img
                            src={bookEdition.photo_url}
                            alt={bookEdition.book.title}
                            className="aspect-[3/4] h-full w-full transform object-cover transition duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>

                    {auth.user.role === 'client' ? (
                        <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4">
                            <button
                                className="bg-primary text-primary-foreground cursor-pointer rounded-lg px-4 py-2 shadow transition hover:shadow-lg disabled:opacity-50"
                                onClick={handleRequest}
                                disabled={copies_left < 1 || processing || successShown.current}
                            >
                                {copies_left > 0 ? (successShown.current ? 'Book Requested' : 'Request Book') : 'No Copies Available'}
                            </button>
                            <Link href="/books" className="text-primary underline">
                                Back to list
                            </Link>
                        </div>
                    ) : (
                        <div className="mx-auto mt-6 flex flex-col items-center justify-start gap-4">
                            {adminLinks.map((link) => (
                                <Link
                                    key={link.title}
                                    className="bg-primary text-primary-foreground cursor-pointer rounded-lg px-4 py-2
                                    shadow transition hover:shadow-lg disabled:opacity-50 w-full text-center"
                                    href={link.href(bookEdition)}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="acrylic flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl p-6 shadow-xl md:p-8">
                    <h1 className="mb-4 text-3xl font-bold">{bookEdition.book.title}</h1>
                    <p className="text-muted-foreground mb-4 italic">{bookEdition.book.author.name}</p>

                    <div className="relative h-0 min-h-0 w-full flex-1 overflow-y-auto">
                        <p className="mb-6 leading-relaxed">{bookEdition.book.description}</p>

                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="block text-xs tracking-wider text-gray-400 uppercase">Published</span>
                                <span>{new Date(bookEdition.book.first_published_date).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="block text-xs tracking-wider text-gray-400 uppercase">Publisher</span>
                                <span>{bookEdition.publisher.name}</span>
                            </div>
                            <div>
                                <span className="block text-xs tracking-wider text-gray-400 uppercase">ISBN</span>
                                <span>{bookEdition.isbn}</span>
                            </div>
                            <div>
                                <span className="block text-xs tracking-wider text-gray-400 uppercase">Edition Release</span>
                                <span>{new Date(bookEdition.published_date).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="block text-xs tracking-wider text-gray-400 uppercase">Availability</span>
                                <span className="font-semibold">{copies_left > 0 ? `${copies_left} copies left` : 'Out of stock'}</span>
                            </div>
                        </div>

                        <div className={'mt-8 space-y-6'}>
                            {otherEditionsOfBook.length > 0 && (
                                <section>
                                    <div className="text-s mt-8 mb-4 tracking-wider text-gray-200 uppercase">
                                        More Editions of <strong>{bookEdition.book.title}</strong>
                                    </div>
                                    <Scroller variant={'horizontal'} className={'block'}>
                                        {otherEditionsOfBook.map((edition) => (
                                            <BookCard bookEdition={edition} key={edition.id} size="small" className={'block'} />
                                        ))}
                                    </Scroller>
                                </section>
                            )}

                            {otherBookEditionsByAuthor.length > 0 && (
                                <section>
                                    <div className="text-s mt-8 mb-4 tracking-wider text-gray-200 uppercase">
                                        Other books by <strong>{bookEdition.book.author.name}</strong>
                                    </div>
                                    <Scroller variant={'vertical'}>
                                        {otherBookEditionsByAuthor.map((edition) => (
                                            <BookCard bookEdition={edition} key={edition.id} size="small" />
                                        ))}
                                    </Scroller>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
