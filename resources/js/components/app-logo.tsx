import AppLogoIcon from './app-logo-icon';
import BookStackLogo from '@/components/ui/book-logo';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <BookStackLogo className={'stroke-[12]'}/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Bibliotheca</span>
            </div>
        </>
    );
}
