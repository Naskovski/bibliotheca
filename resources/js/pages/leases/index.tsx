import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BookCard } from '@/components/book-card';
import Scroller from '@/components/scroller';
import { Lease } from '@/types/models';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Leases',
        href: '/leases',
    },
];

const buttonStyles = {
    sm: 'w-24 p-3 mt-auto rounded-xl transition cursor-pointer',
    lg: 'w-52 p-3 mt-auto rounded-xl transition cursor-pointer',
};

export default function Index(props: any) {
    const { patch, setData, processing } = useForm({ status: '' });
    const { auth } = usePage().props;
    const isLibrarian = auth.user?.role === 'librarian';

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

    const ActionButton = ({
                              status,
                              className = '',
                              lease,
                              variant = 'lg',
                              children,
                          }: {
        status: string;
        className?: string;
        lease: Lease;
        variant?: 'lg' | 'sm';
        children?: React.ReactNode;
    }) => {
        const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            setData('status', status);
            patch(route('leases.update', lease.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => toast.success(`Lease successfully ${status}!`),
                onError: () => toast.error('Failed to update lease.'),
            });
        };

        return (
            <button
                className={`${buttonStyles[variant]} ${className}`}
                onClick={handleClick}
                disabled={processing}
            >
                {children || status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
        );
    };

    const cancelLeaseButton = (lease: Lease) => (
        <ActionButton
            lease={lease}
            status="cancelled"
            className="bg-red-500 text-gray-800 dark:bg-[#cf0707aa] hover:dark:bg-red-700 dark:text-gray-200"
        >
            Cancel
        </ActionButton>
    );

    const extraData = (status: string, lease: Lease) => {
        if (!isLibrarian) return(status === 'requested' || status === 'approved') ? cancelLeaseButton(lease) : null;

        const clientDetails = (
            <p className="text-sm text-middle align-middle text-center text-gray-200 mb-2">
                {statusLabels[status]} by <strong>{lease?.client?.name}</strong> ({lease?.client?.email})<br />
            </p>
        );

        const buttons = () => {
            switch (status) {
                case 'requested':
                    return (
                        <div className="flex flex-col items-center justify-between gap-2">
                            <ActionButton lease={lease} status="approved" className="bg-green-500 text-gray-800 dark:bg-[#0a9c0aaa] hover:dark:bg-green-700 dark:text-gray-200">
                                Approve
                            </ActionButton>
                            {cancelLeaseButton(lease)}
                        </div>
                    );
                case 'approved':
                    return (
                        <div className="flex flex-col items-center justify-between gap-2">
                            <ActionButton lease={lease} status="collected" className="bg-blue-500 text-gray-800 dark:bg-[#0a6d9caa] hover:dark:bg-blue-700 dark:text-gray-200">
                                Mark Collected
                            </ActionButton>
                            {cancelLeaseButton(lease)}
                        </div>
                    );
                case 'collected':
                    return (
                        <div className="flex flex-col items-center justify-between gap-2">
                            <ActionButton lease={lease} status="overdue" className="bg-orange-500 text-gray-800 dark:bg-[#ffa500aa] hover:dark:bg-orange-700 dark:text-gray-200">
                                Mark Overdue
                            </ActionButton>
                            <ActionButton lease={lease} status="returned" className="bg-green-500 text-gray-800 dark:bg-[#0a9c0aaa] hover:dark:bg-green-700 dark:text-gray-200">
                                Return
                            </ActionButton>
                        </div>
                    );
                case 'overdue':
                    return (
                        <ActionButton lease={lease} status="returned" className="bg-green-500 text-gray-800 dark:bg-[#0a9c0aaa] hover:dark:bg-green-700 dark:text-gray-200">
                            Return
                        </ActionButton>
                    );
                default:
                    return null;
            }
        };

        return (
            <div className="mt-auto justify-self-end">
                {clientDetails}
                {buttons()}
            </div>
        );
    };

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
                            <h2 className="mb-4 text-xl font-bold">{statusLabels[status]}</h2>
                            <Scroller variant="horizontal" className="block">
                                {leases.map((lease: Lease) => (
                                    <BookCard
                                        key={lease.id}
                                        bookEdition={lease.book_copy.book_edition}
                                    >
                                        {extraData(status, lease)}
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
                        leasesByStatus[status].data.length === 0,
                ) && <div className="text-center text-gray-500">No leases found</div>}
            </section>
        </AppLayout>
    );
}
