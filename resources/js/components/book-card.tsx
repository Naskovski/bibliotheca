import { BookEdition } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ReactNode, useEffect } from 'react';

type BookCardSize = 'small' | 'medium' | 'large';

const sizeClasses: Record<BookCardSize, { card: string; image: string }> = {
    small: { card: 'w-40 p-2 pt-2.5', image: 'w-34' },
    medium: { card: 'w-64 p-4', image: 'w-56' },
    large: { card: 'w-80 p-6', image: 'w-72' },
};

export function BookCard({
                             bookEdition,
                             className = '',
                             size = 'medium',
                             children,
                         }: {
    bookEdition: BookEdition;
    className?: string;
    size?: BookCardSize;
    children?: ReactNode;
}) {
    const { card, image } = sizeClasses[size];

    return (
        <Link
            href={route('bookEditions.show', bookEdition.id)}
            className={`acrylic flex flex-col gap-2 justify-start rounded-lg align-middle items-center shadow-sm
            transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.3)]
            ${card} ${className}`}
        >
            <div className={`relative aspect-[3/4] ${image}`}>
                <img
                    src={bookEdition.photo_url + '?w=400&q=50&fm=webp'}
                    alt={bookEdition.book.title}
                    className="absolute inset-0 h-full w-full rounded-lg object-cover"
                    onError={e => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/images/no-photo-available.png';
                        target.classList.remove('h-full');
                    }}
                />
            </div>

            <h3 className="text-lg font-semibold line-clamp-2">{bookEdition.book.title}</h3>
            <p className="text-muted-foreground text-sm">
                {bookEdition.book.author.name} &middot;{' '}
                {new Date(bookEdition.book.first_published_date).toLocaleDateString(undefined, { year: 'numeric' })}
            </p>
            {children}
        </Link>
    );
}
