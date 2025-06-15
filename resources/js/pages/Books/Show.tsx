import { BookCard } from '@/components/book-card';
import Scroller from '@/components/scroller';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { BookEdition, User } from '@/types/models';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface ShowProps {
    bookEdition: BookEdition;
    copies_left: number;
    otherEditionsOfBook: BookEdition[];
    otherBookEditionsByAuthor: BookEdition[];
    5;
}

export default function Show({ bookEdition, copies_left, otherEditionsOfBook, otherBookEditionsByAuthor }: ShowProps) {
    const { post, processing } = useForm();
    const { auth } = usePage().props as { auth: { user: User } };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: (
                <>
                    <Link href="/books" className="mr-2 inline-block">
                        <ArrowLeft className="inline h-4 w-4" />
                    </Link>
                    Details
                </>
            ),
            href: '/books/editions/' + bookEdition.id,
        },
    ];

    const handleRequest = () => {
        post(route('bookEditions.request', bookEdition.id));
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

                    {auth.user.role === 'client' && (
                        <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4">
                            <button
                                className="bg-primary text-primary-foreground rounded-lg px-4 py-2 shadow transition hover:shadow-lg disabled:opacity-50"
                                onClick={handleRequest}
                                disabled={copies_left < 1 || processing}
                            >
                                {copies_left > 0 ? 'Request Book' : 'No Copies Available'}
                            </button>
                            <Link href="/books" className="text-primary underline">
                                Back to list
                            </Link>
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
