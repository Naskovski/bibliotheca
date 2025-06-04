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
