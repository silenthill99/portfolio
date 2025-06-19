import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

type StageProps = {
    id: number;
    title: string;

}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stages',
        href: '/stage',
    },
];


const StageList = () => {
    const { stages } = usePage<{stages: StageProps[]}>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stages"/>
            <div className={"p-5"}>
                <Link href={route('add')} className={"bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-700"}>Ajouter un article</Link>
            </div>
        </AppLayout>
    );
};

export default StageList;
