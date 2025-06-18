export default function Loader  () {

    return (
        <div className="fixed inset-0 acrylic flex items-center justify-center z-50">
            <div className="loader border-4 border-t-4 border-gray-200 rounded-xl w-12 h-12 animate-spin"></div>
            <span className="ml-4 text-white text-lg">Updating...</span>
        </div>
    );
}
