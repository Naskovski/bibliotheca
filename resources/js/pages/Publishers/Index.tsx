import React, { useState } from 'react';
import { usePage, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Publisher } from '@/types/models';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function PublisherManage() {
    const { publishers: propPublishers } = usePage().props as { publishers: Publisher[] };
    const [publishers, setPublishers] = useState<Publisher[]>(propPublishers);
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editPhone, setEditPhone] = useState('');

    // Sync state with props after reload
    React.useEffect(() => {
        setPublishers(propPublishers);
    }, [propPublishers]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Publishers', href: '/publishers' },
    ];

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            '/publishers',
            { name: newName, address: newAddress, phone: newPhone },
            {
                onSuccess: (page) => {
                    setPublishers((page.props as any).publishers);
                    setNewName('');
                    setNewAddress('');
                    setNewPhone('');
                    toast.success('Publisher added successfully');
                },
                onError: (error) => {
                    toast.error(`Failed to add publisher: ${error.message}`);
                },
            }
        );
    };

    const startEdit = (publisher: Publisher) => {
        setEditingId(publisher.id);
        setEditName(publisher.name);
        setEditAddress(publisher.address || '');
        setEditPhone(publisher.phone || '');
    };

    const handleEdit = (publisher: Publisher) => {
        router.put(
            `/publishers/${publisher.id}`,
            { name: editName, address: editAddress, phone: editPhone },
            {
                onSuccess: (page) => {
                    setPublishers((page.props as any).publishers);
                    setEditingId(null);
                    toast.success('Publisher updated successfully');
                },
                onError: (error) => {
                    toast.error(`Failed to update publisher: ${error.message}`);
                },
            }
        );
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this publisher?')) return;
        router.delete(`/publishers/${id}`, {
            onSuccess: (page) => {
                setPublishers((page.props as any).publishers);
                toast.success('Publisher deleted successfully');
            },
            onError: (error) => {
                toast.error(`Failed to delete publisher: ${error.message}`);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Publishers" />
            <div className="mx-auto mt-8 w-full max-w-4xl">
                <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 text-center p-4 shadow-sm">
                    Manage Publishers
                </h1>
                <form onSubmit={handleAdd}>
                    <div className="rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="acrylic text-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 border-b">ID</th>
                                    <th className="px-4 py-3 border-b">Name</th>
                                    <th className="px-4 py-3 border-b">Address</th>
                                    <th className="px-4 py-3 border-b">Phone</th>
                                    <th className="px-4 py-3 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 acrylic">
                                <tr className="hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-black dark:hover:text-gray-100">
                                    <td className="px-4 py-3 text-gray-400">New</td>
                                    <td className="px-4 py-3">
                                        <Input
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            required
                                            placeholder="Enter name"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Input
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                            placeholder="Enter address (optional)"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Input
                                            value={newPhone}
                                            onChange={(e) => setNewPhone(e.target.value)}
                                            placeholder="Enter phone (optional)"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            type="submit"
                                            className="cursor-pointer inline-block rounded border border-gray-300 bg-white px-4 py-2 text-sm text-black hover:bg-gray-100 transition"
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                                {publishers.map((publisher) => (
                                    <tr key={publisher.id} className="hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-black dark:hover:text-gray-100">
                                        <td className="px-4 py-3 font-medium">{publisher.id}</td>
                                        <td className="px-4 py-3">
                                            {editingId === publisher.id ? (
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                />
                                            ) : (
                                                publisher.name
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {editingId === publisher.id ? (
                                                <Input
                                                    value={editAddress}
                                                    onChange={(e) => setEditAddress(e.target.value)}
                                                />
                                            ) : (
                                                publisher.address
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {editingId === publisher.id ? (
                                                <Input
                                                    value={editPhone}
                                                    onChange={(e) => setEditPhone(e.target.value)}
                                                />
                                            ) : (
                                                publisher.phone
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {editingId === publisher.id ? (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => handleEdit(publisher)}
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
                                                        onClick={() => startEdit(publisher)}
                                                        type="button"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => handleDelete(publisher.id)}
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

