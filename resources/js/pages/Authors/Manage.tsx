import React, { useState } from 'react';
import { usePage, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Author } from '@/types/models';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AuthorManage() {
    const { authors: initialAuthors } = usePage().props as { authors: Author[] };
    const [authors, setAuthors] = useState<Author[]>(initialAuthors);
    const [newName, setNewName] = useState('');
    const [newBio, setNewBio] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editBio, setEditBio] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manage Authors', href: '/authors/manage' },
    ];

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            '/authors',
            { name: newName, bio: newBio },
            {
                onSuccess: (page) => {
                    setAuthors((page.props as any).authors);
                    setNewName('');
                    setNewBio('');
                    toast.success('Author added successfully');
                },
                onError: (error) => {
                    toast.error(`Failed to add author: ${error.message}`);
                },
            }
        );
    };

    const startEdit = (author: Author) => {
        setEditingId(author.id);
        setEditName(author.name);
        setEditBio(author.bio || '');
    };

    const handleEdit = (author: Author) => {
        router.put(
            `/authors/${author.id}`,
            { name: editName, bio: editBio },
            {
                onSuccess: (page) => {
                    setAuthors((page.props as any).authors);
                    setEditingId(null);
                    toast.success('Author updated successfully');
                },
                onError: (error) => {
                    toast.error(`Failed to update author: ${error.message}`);
                },
            }
        );
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this author?')) return;
        router.delete(`/authors/${id}`, {
            onSuccess: (page) => {
                setAuthors((page.props as any).authors);
                toast.success('Author deleted successfully');
            },
            onError: (error) => {
                toast.error(`Failed to delete author: ${error.message}`);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Authors" />
            <div className="mx-auto mt-8 w-full max-w-4xl">
                <form onSubmit={handleAdd}>
                    <div className="rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="acrylic text-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 border-b">ID</th>
                                    <th className="px-4 py-3 border-b">Name</th>
                                    <th className="px-4 py-3 border-b">Bio</th>
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
                                            value={newBio}
                                            onChange={(e) => setNewBio(e.target.value)}
                                            placeholder="Enter bio (optional)"
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
                                {authors.map((author) => (
                                    <tr key={author.id} className="hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-black dark:hover:text-gray-100">
                                        <td className="px-4 py-3 font-medium">{author.id}</td>
                                        <td className="px-4 py-3">
                                            {editingId === author.id ? (
                                                <Input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                />
                                            ) : (
                                                author.name
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {editingId === author.id ? (
                                                <Input
                                                    value={editBio}
                                                    onChange={(e) => setEditBio(e.target.value)}
                                                />
                                            ) : (
                                                author.bio
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {editingId === author.id ? (
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => handleEdit(author)}
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
                                                        onClick={() => startEdit(author)}
                                                        type="button"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="cursor-pointer rounded border border-gray-300 bg-white px-3 py-1 text-black hover:bg-gray-100 transition"
                                                        onClick={() => handleDelete(author.id)}
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

