import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export type Article = {
    id: number;
    title: string;
    path: string;
    description: string;
    created_at: string;
    updated_at: string;
    slug: string;
    link: string;
    github: string;
    image_url: string | null
};

export type Stage = {
    id: number;
    title: string;
    entreprise: string;
    competences: string;
    start_at: string;
    end_at: string;
};


export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PaginatedProps<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        next: string | null;
        prev: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface Message {
    id: number
    pseudo: string;
    email: string;
    subject: string;
    message:string;
    created_at: string;
    updated_at: string;
}
