import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import New from '@/pages/Books/New';
import { Author } from '@/types/models';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Books',
        href: '/books',
    },
];

export default function Dashboard() {


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />
            <div className="bg-photo flex h-full  flex-col gap-4 rounded-xl p-4 overflow-y-scroll">

                    <div className="acrylic h-52border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0" />
                        <div className="flex h-full w-full items-center justify-center">
                            <h1 className="text-2xl font-bold text-white">Welcome to the Dashboard</h1>
                        </div>
                    </div>

            </div>
        </AppLayout>
    );
}
