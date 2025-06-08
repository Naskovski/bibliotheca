import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { BookEdition } from '@/types/models';
import { ArrowLeft } from 'lucide-react';


interface ShowProps {
    bookEdition: BookEdition;
    copies_left: number;
}

export default function Show({ bookEdition, copies_left }: ShowProps) {
    const { post, processing, errors } = useForm();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: <>
                <Link href="/books" className="inline-block">
                    <ArrowLeft className={"inline"}/>
                </Link>
                {bookEdition.book.title}
            </>,
            href: '/books/editions/' + bookEdition.id,
        },
    ];

    const handleRequest = () => {
        post(route('bookEditions.request', bookEdition.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={bookEdition.book.title} />
            <div className="flex gap-8 acrylic p-8 w-full h-full rounded-lg" >
                <div className="w-56  aspect-[3/4] relative">
                    <img
                        src={bookEdition.photo_url}
                        alt={bookEdition.book.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{bookEdition.book.title}</h1>
                    <p className="text-muted-foreground mb-1">
                        Author: {bookEdition.book.author.name}
                    </p>
                    <p className="text-muted-foreground mb-1">
                        Publisher: {bookEdition.publisher.name}
                    </p>
                    <p className="text-muted-foreground mb-1">
                        ISBN: {bookEdition.isbn}
                    </p>
                    <p className="text-muted-foreground mb-1">
                        Published: {new Date(bookEdition.published_date).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground mb-1">
                        Copies left: <span className="font-semibold">{copies_left}</span>
                    </p>
                    <button
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
                        onClick={handleRequest}
                        disabled={copies_left < 1 || processing}
                    >
                        {copies_left > 0 ? 'Request Book' : 'No Copies Available'}
                    </button>
                    <Link href="/books" className="text-primary underline mt-4 inline-block ml-4">Back to list</Link>
                </div>
            </div>
        </AppLayout>
    );
}
