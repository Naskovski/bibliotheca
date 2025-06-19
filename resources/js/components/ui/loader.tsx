import { LoaderCircle } from 'lucide-react';

export default function Loader  () {

    return (
        <div className="fixed inset-0 acrylic flex items-center justify-center z-50">
            <LoaderCircle className="h-12 w-12 animate-spin" />
            <span className="ml-4 text-white text-lg">Updating...</span>
        </div>
    );
}
