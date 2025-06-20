import { BookCard } from '@/components/book-card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Index({ books, filters = {}, authors = [], publishers = [] }) {
    const { success } = usePage().props as { success?: string };
    const successShown = useRef(false);

    const [filterTitle, setFilterTitle] = useState(filters.title || '');
    const [filterAuthor, setFilterAuthor] = useState(filters.author_id || '');
    const [filterPublisher, setFilterPublisher] = useState(filters.publisher_id || '');

    const handleFilter = () => {
        router.get(
            '/books',
            {
                title: filterTitle || undefined,
                author_id: filterAuthor || undefined,
                publisher_id: filterPublisher || undefined,
            },
            { preserveState: true }
        );
    };

    const clearFilters = () => {
        setFilterTitle('');
        setFilterAuthor('');
        setFilterPublisher('');
        router.get('/books');
    };

    useEffect(() => {
        if (success && !successShown.current) {
            toast.success(
                <span className="text-green-900 dark:text-green-300">
          {success || 'Successfully completed the action!'}
        </span>
            );
            successShown.current = true;
        }
    }, [success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />

            <div className="mx-auto max-w-6xl bg-white/70 dark:bg-black/30 backdrop-blur-md rounded-lg p-6 mb-8 shadow flex flex-wrap justify-center gap-4">
                <Input
                    placeholder="Filter by title"
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                    onBlur={handleFilter}
                    className="w-64 bg-gray-200 text-gray-900"
                />

                <div className="w-48">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                            >
                                {
                                    filterAuthor
                                        ? authors.find((a) => a.id.toString() === filterAuthor)?.name
                                        : 'All Authors'
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-0">
                            <Command>
                                <CommandInput placeholder="Search author..." />
                                <CommandEmpty>No author found.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-y-auto">
                                    <CommandItem
                                        key=""
                                        value="all authors"
                                        onSelect={() => {
                                            setFilterAuthor('');
                                            handleFilter();
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                filterAuthor === '' ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                        All Authors
                                    </CommandItem>
                                    {authors.map((author) => (
                                        <CommandItem
                                            key={author.id}
                                            value={author.name.toLowerCase()}
                                            onSelect={() => {
                                                setFilterAuthor(author.id.toString());
                                                handleFilter();
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    filterAuthor === author.id.toString()
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {author.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-48">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                            >
                                {
                                    filterPublisher
                                        ? publishers.find((p) => p.id.toString() === filterPublisher)?.name
                                        : 'All Publishers'
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-0">
                            <Command>
                                <CommandInput placeholder="Search publisher..." />
                                <CommandEmpty>No publisher found.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-y-auto">
                                    <CommandItem
                                        key=""
                                        value="all publishers"
                                        onSelect={() => {
                                            setFilterPublisher('');
                                            handleFilter();
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                filterPublisher === '' ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                        All Publishers
                                    </CommandItem>
                                    {publishers.map((publisher) => (
                                        <CommandItem
                                            key={publisher.id}
                                            value={publisher.name.toLowerCase()}
                                            onSelect={() => {
                                                setFilterPublisher(publisher.id.toString());
                                                handleFilter();
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    filterPublisher === publisher.id.toString()
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {publisher.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <Button onClick={handleFilter}>Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>

            <section className="flex flex-wrap justify-center items-stretch gap-4 py-12">
                {books?.data?.length > 0 ? (
                    books.data.map((bookEdition) => (
                        <BookCard key={bookEdition.id} bookEdition={bookEdition} />
                    ))
                ) : (
                    <p>No books found.</p>
                )}
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
