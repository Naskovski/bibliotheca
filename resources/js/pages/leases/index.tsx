import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { BookCard } from '@/components/book-card';
import Scroller from '@/components/scroller';
import { Lease } from '@/types/models';
import { toast } from "sonner"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Leases',
        href: '/leases',
    },
];

export default function Index(props: any) {
    const { patch, setData, processing } = useForm({ status: '' });

    const leasesByStatus = props.leasesByStatus || {};
    const statusOrder = [
        'requested',
        'approved',
        'collected',
        'overdue',
        'returned',
        'cancelled',
    ];
    const statusLabels: Record<string, string> = {
        requested: 'Requested',
        approved: 'Approved',
        collected: 'Collected',
        overdue: 'Overdue',
        returned: 'Returned',
        cancelled: 'Cancelled',
    };

    useEffect(() => {
        console.log(props.leasesByStatus);
    }, []);

    const handleCancel = (lease: Lease) => {

        console.log('handleCancel called for lease:', lease);
        if (confirm('Are you sure you want to cancel this lease?')) {
            setData('status', 'cancelled');
            patch(route('leases.update', lease.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => { toast.success('Lease successfully updated!'); },
                onError: () => { toast.error('Failed to update lease.'); },
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Books" />
            <section className="py-12">
                {statusOrder.map((status) => {
                    const statusData = leasesByStatus[status];
                    const leases = statusData?.data || [];
                    if (!leases.length) return null;

                    return (
                        <div key={status} className="mb-10">
                            <h2 className="text-xl font-bold mb-4">
                                {statusLabels[status]}
                            </h2>
                            <Scroller variant="horizontal" className="block">
                                {leases.map((lease: Lease) => (
                                    <BookCard
                                        key={lease.id}
                                        bookEdition={lease.book_copy.book_edition}
                                    >
                                        {(lease.status === 'requested' || lease.status === 'approved') && (
                                            <button
                                                className="w-52 p-3 mt-auto rounded-xl bg-red-500 text-gray-800
                                                dark:bg-[#cf0707aa] hover:dark:bg-red-700 dark:text-gray-200
                                                transition cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleCancel(lease);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </BookCard>
                                ))}
                            </Scroller>
                        </div>
                    );
                })}
                {statusOrder.every(
                    (status) =>
                        !leasesByStatus[status] ||
                        !leasesByStatus[status].data ||
                        leasesByStatus[status].data.length === 0
                ) && (
                    <div className="text-center text-gray-500">
                        No leases found
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
