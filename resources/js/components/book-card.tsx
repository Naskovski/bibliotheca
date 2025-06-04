import { BookEdition } from '@/types/models';
import { useEffect } from 'react';

export function BookCard({ bookEdition }: { bookEdition: BookEdition }) {
    useEffect(() => {
        console.log('Book Edition:', bookEdition);
    }, []);

    return (
        <>
            <div className={'acrylic w-64 flex flex-col align-middle tems-start rounded-lg p-4 shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.3)]'}>
                <div className="relative w-56 aspect-[3/4] mb-4">
                    <img
                        src={bookEdition.photo_url}
                        alt={bookEdition.book.title}
                        className="absolute inset-0 h-full w-full rounded-lg object-cover"
                    />
                </div>
                <h3 className="text-lg font-semibold">{bookEdition.book.title}</h3>
                <p className="text-muted-foreground text-sm">
                    {bookEdition.book.author.name} &middot; {new Date(bookEdition.book.first_published_date).toLocaleDateString(undefined, { year: 'numeric' })}
                </p>
            </div>
        </>
    );
}
