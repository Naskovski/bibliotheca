import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export type FormField =
    | {
    type: 'text' | 'date';
    name: string;
    label: string;
    value?: string;
    required?: boolean;
}
    | {
    type: 'select';
    name: string;
    label: string;
    options: { value: string | number; label: string }[];
    value?: string | number;
    required?: boolean;
    searchable?: boolean;
}
    | {
    type: 'textarea';
    name: string;
    label: string;
    value?: string;
    required?: boolean;
};

interface FormProps {
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => void;
    submitLabel?: string;
    initialValues?: Record<string, any>;
    loading?: boolean;
}

export const Form: React.FC<FormProps> = ({
                                              fields,
                                              onSubmit,
                                              submitLabel = 'Submit',
                                              initialValues = {},
                                              loading,
                                          }) => {
    const [form, setForm] = React.useState<Record<string, any>>(initialValues);
    const [search, setSearch] = React.useState<Record<string, string>>({});

    const handleChange = (name: string, value: any) => {
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSearch = (name: string, value: string) => {
        setSearch((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => {
                if (field.type === 'text') {
                    return (
                        <div className="acrylic p-6 mb-3 rounded-lg" key={field.name}>
                            <label className="block font-medium mb-1">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                value={form[field.name] || ''}
                                required={field.required}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                    );
                }

                if (field.type === 'date') {
                    return (
                        <div className="acrylic p-6 mb-3 rounded-lg" key={field.name}>
                            <label className="block font-medium mb-1">{field.label}</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className={cn(
                                            'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-left font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                                            !form[field.name] && 'text-muted-foreground'
                                        )}
                                    >
                                        {form[field.name]
                                            ? format(new Date(form[field.name]), 'PPP')
                                            : 'Pick a date'}
                                        <CalendarIcon className="ml-2 h-4 w-4 inline-block opacity-50 float-right" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            form[field.name] ? new Date(form[field.name]) : undefined
                                        }
                                        onSelect={(date) => {
                                            if (date) {
                                                handleChange(
                                                    field.name,
                                                    date.toISOString().split('T')[0]
                                                );
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    );
                }

                if (field.type === 'select') {
                    const options =
                        field.searchable && search[field.name]
                            ? field.options.filter((opt) =>
                                opt.label
                                    .toLowerCase()
                                    .includes(search[field.name].toLowerCase())
                            )
                            : field.options;

                    return (
                        <div className="acrylic p-6 mb-3 rounded-lg" key={field.name}>
                            <label className="block font-medium mb-1">{field.label}</label>
                            {field.searchable && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search[field.name] || ''}
                                    onChange={(e) =>
                                        handleSearch(field.name, e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 mb-2 transition"
                                />
                            )}
                            <Select
                                value={form[field.name]?.toString() || ''}
                                onValueChange={(val) => handleChange(field.name, val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value.toString()}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    );
                }

                if (field.type === 'textarea') {
                    return (
                        <div className="acrylic p-6 mb-3 rounded-lg" key={field.name}>
                            <label className="block font-medium mb-1">{field.label}</label>
                            <textarea
                                name={field.name}
                                value={form[field.name] || ''}
                                required={field.required}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
                            />
                        </div>
                    );
                }

                return null;
            })}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-blue-200 cursor-pointer transition"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
};
