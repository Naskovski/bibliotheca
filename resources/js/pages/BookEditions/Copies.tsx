import React, { useState } from 'react';
import { usePage, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { BookEdition, BookCopy } from '@/types/models';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function BookEditionCopies() {
    const { bookEdition, copies: initialCopies } = usePage().props as {
        bookEdition: BookEdition;
        copies: BookCopy[];
    };

    const [copies, setCopies] = useState<BookCopy[]>(initialCopies);
    const [newBarcode, setNewBarcode] = useState('');
    const [newStatus, setNewStatus] = useState<'available' | 'leased' | 'lost'>('available');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editBarcode, setEditBarcode] = useState('');
    const [editStatus, setEditStatus] = useState<'available' | 'leased' | 'lost'>('available');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: bookEdition.book.title, href: `/book-editions/${bookEdition.id}` },
        { title: 'Copies', href: `/book-editions/${bookEdition.id}/copies` },
    ];

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            `/book-editions/${bookEdition.id}/copies`,
            { barcode: newBarcode, status: newStatus },
            {
                onSuccess: (page) => {
                    setCopies((page.props as any).copies);
                    setNewBarcode('');
                    setNewStatus('available');
                    toast.success('Copy added successfully');
                },
                onError: (error) => {
                    toast.error(`Failed to add copy: ${error.message}`);
                },
            }
        );
    };

    const startEdit = (copy: BookCopy) => {
        setEditingId(copy.id);
        setEditBarcode(copy.barcode);
        setEditStatus(copy.status);
    };

    const handleEdit = (copy: BookCopy) => {
        router.put(
            `/book-copies/${copy.id}`,
            { barcode: editBarcode, status: editStatus },
            {
                onSuccess: (page) => {
                    setCopies((page.props as any).copies);
                    setEditingId(null);
                    toast.success('Copy updated successfully');
                },
                onError: (error) => {
                    toast.error(`Failed to update copy: ${error.message}`);
                },
            }
        );
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this copy?')) return;
        router.delete(`/book-copies/${id}`, {
            onSuccess: (page) => {
                setCopies((page.props as any).copies);
                toast.success('Copy deleted successfully');
            },
            onError: (error) => {
                toast.error(`Failed to delete copy: ${error.message}`);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Edition Copies" />
                <div className="mx-auto mt-8 w-full">
                    <h1 className={`text-2xl font-semibold text-gray-600 dark:text-gray-300 text-center p-4 shadow-sm`}>
                        <span className={'text-3xl text-gray-900 dark:text-gray-200'}>{bookEdition.book.title}</span>  {bookEdition.publisher.name} - {new Date(bookEdition.published_date).getFullYear()}
                    </h1>
                    <form onSubmit={handleAdd}>
                        <div className="rounded-xl shadow-sm overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="acrylic text-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 border-b">ID</th>
                                    <th className="px-4 py-3 border-b">Barcode</th>
                                    <th className="px-4 py-3 border-b">Status</th>
                                    <th className="px-4 py-3 border-b text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 acrylic">
                                <tr className="hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-black dark:hover:text-gray-100">
                                    <td className="px-4 py-3 text-gray-400">New</td>
                                    <td className="px-4 py-3">
                                        <Input
                                            value={newBarcode}
                                            onChange={(e) => setNewBarcode(e.target.value)}
                                            required
                                            placeholder="Enter barcode"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Select value={newStatus} onValueChange={(val) => setNewStatus(val as any)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="available">Available</SelectItem>
                                                <SelectItem value="leased">Leased</SelectItem>
                                                <SelectItem value="lost">Lost</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            type="submit"
                                            className="cursor-pointer  inline-block rounded border border-gray-300 bg-white px-4 py-2 text-sm text-black hover:bg-gray-100 transition"
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>

                                {copies.map((copy) => (
                                    <tr key={copy.id} className="hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-black dark:hover:text-gray-100">
                                        <td className="px-4 py-3 font-medium">{copy.id}</td>
                                        <td className="px-4 py-3">
                                            {editingId === copy.id ? (
                                                <Input
                                                    value={editBarcode}
                                                    onChange={(e) => setEditBarcode(e.target.value)}
                                                />
                                            ) : (
                                                copy.barcode
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {editingId === copy.id ? (
                                                <Select
                                                    value={editStatus}
                                                    onValueChange={(val) => setEditStatus(val as any)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="available">Available</SelectItem>
                                                        <SelectItem value="leased">Leased</SelectItem>
                                                        <SelectItem value="lost">Lost</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                copy.status
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {editingId === copy.id ? (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => handleEdit(copy)}
                                                        type="button"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => setEditingId(null)}
                                                        type="button"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => startEdit(copy)}
                                                        type="button"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => handleDelete(copy.id)}
                                                        type="button"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
        </AppLayout>
    );
}
