import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Rows3, UserRound } from 'lucide-react';
import AppLogo from './app-logo';
import { useEffect } from 'react';

const clientNavItems: NavItem[] = [
    {
        title: 'Browse Books',
        href: '/books',
        icon: BookOpen,
    },
    {
        title: 'Authors',
        href: '/authors',
        icon: UserRound,
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
        title: 'Authors',
        href: '/authors',
        icon: UserRound,
    },
    {
        title: 'Leases',
        href: '/leases',
        icon: Rows3,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
