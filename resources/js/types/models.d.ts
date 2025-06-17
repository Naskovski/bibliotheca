export interface Author {
    id: number;
    name: string;
    bio?: string | null;
    created_at: string;
    updated_at: string;
}

export type Book = {
    id: number;
    title: string;
    first_published_date: string;
    author_id: number;
    created_at: string;
    updated_at: string;
    author: Author;
    description: string | null;
};

export type Publisher = {
    id: number;
    name: string;
    address: string;
    phone: string;
    created_at: string;
    updated_at: string;
};

export type BookEdition = {
    id: number;
    book_id: number;
    publisher_id: number;
    isbn: string;
    published_date: string;
    photo_url: string;
    created_at: string;
    updated_at: string;
    book: Book;
    publisher: Publisher;
};

export type User = {
    id: number;
    name: string;
    email: string;
    role: 'client' | 'librarian';
}

export type BookCopy = {
    id: number;
    book_edition_id: number;
    barcode: string;
    status: 'available' | 'leased' | 'lost';
    created_at: string;
    updated_at: string;
};

export type Lease = {
    id: number;
    client_id: number;
    librarian_id: number | null;
    book_copy_id: number | null;
    lease_date: string | null;
    return_date: string | null;
    status: 'requested' | 'approved' | 'collected' | 'returned' | 'overdue' | 'cancelled';
    created_at: string;
    updated_at: string;
};
