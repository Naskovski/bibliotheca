import BookStackLogo from '@/components/ui/book-logo';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        if (auth?.user) {
            window.location.href = route('books.index');
        }
    }, [auth]);

    return (
        <>
            <Head title="Welcome - Bibliotheca">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-photo p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:text-[#EDEDEC]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('books.index')}
                                className="inline-block rounded-sm border border-white bg-black px-5 py-1.5 text-sm text-white hover:bg-white hover:text-black transition dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                            >
                                Continue to app
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-white bg-black px-5 py-1.5 text-sm text-white hover:bg-white hover:text-black transition dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-black bg-white px-5 py-1.5 text-sm text-black hover:bg-black hover:text-white transition dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex w-full max-w-[335px] flex-col-reverse items-center lg:max-w-4xl lg:flex-row lg:items-stretch">
                    <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 shadow-[inset_0_0_0_1px_rgba(26,26,0,0.1)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615]">
                        <h1 className="mb-4 text-2xl font-semibold">Welcome to <span className="text-blue-700 dark:text-blue-400">Bibliotheca</span></h1>
                        <p className="mb-6 text-[#4B4B48] dark:text-[#A1A09A]">
                            Discover, borrow, and explore the world of books in one elegant platform. Whether you're a casual reader or a library power user, Bibliotheca offers everything you need to manage your reading journey.
                        </p>
                        <ul className="text-sm text-[#2b2b28] dark:text-[#C1C0BA] list-disc pl-5 space-y-1">
                            <li>Browse and search for books with ease</li>
                            <li>Track your borrowings and returns</li>
                            <li>Curate your reading list</li>
                            <li>Fast and modern user experience</li>
                        </ul>
                    </div>

                    <div
                        className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#0d1b2a] bg-[#dceefb] flex items-center justify-center">
                        <BookStackLogo className="w-72 h-72 animate-slide-up opacity-0" />

                        <div
                            className="absolute inset-0 rounded-t-lg shadow-[inset_0_0_0_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0_0_0_1px_#284b63]" />
                    </div>
                </main>

                <footer className="hidden h-14.5 lg:block" />
            </div>
        </>
    );
}
