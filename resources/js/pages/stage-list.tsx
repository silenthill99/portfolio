import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stages',
        href: '/stage',
    },
];

const StageList = () => {
    const { stages } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stages"/>
            <h1>Essai</h1>
        </AppLayout>
    );
};

export default StageList;
