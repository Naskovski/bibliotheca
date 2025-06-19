import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    BuildingIcon,
    Folder,
    LayoutGrid,
    PlusSquareIcon,
    Rows3,
    UserRound,
    WavesLadderIcon
} from 'lucide-react';
import AppLogo from './app-logo';
import { useEffect } from 'react';

const clientNavItems: NavItem[] = [
    {
        title: 'Browse Books',
        href: '/books',
        icon: BookOpen,
    },
    {
        title: 'My Leases',
        href: '/leases',
        icon: Rows3,
    },
];

const librarianNavItems: NavItem[] = [
    {
        title: 'All Books',
        href: '/books',
        icon: BookOpen,
    },
    {
        title: 'Manage Authors',
        href: '/authors',
        icon: UserRound,
    },
    {
        title: 'Manage Publishers',
        href: '/publishers',
        icon: BuildingIcon,
    },
    {
        title: 'Manage Leases',
        href: '/leases',
        icon: Rows3,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'New Book',
        href: '/books/create',
        icon: PlusSquareIcon,
    },
    {
        title: 'New Book Edition',
        href: '/book-editions/create',
        icon: PlusSquareIcon,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isLibrarian = auth.user?.role === 'librarian';

    const mainNavItems = isLibrarian ? librarianNavItems : clientNavItems;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/books" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
                {isLibrarian && <NavFooter items={footerNavItems} className="mt-auto" />}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
