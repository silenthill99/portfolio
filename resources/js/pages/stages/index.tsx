import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type StageProps = {
    id: number;
    title: string;
    entreprise: string;
    competences: string;
    start_at: string;
    end_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stages',
        href: '/stage',
    },
];


const Index = () => {
    const { stages } = usePage<{stages: StageProps[]}>().props;

    function handleDelete(id: number) {
        if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
            router.delete(route("stage.destroy", id))
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stages"/>
            <div className={"p-5"}>
                <Link href={route('add')} className={"bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-700 inline-block"}>Ajouter un article</Link>
                {stages.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Entreprise</TableHead>
                                <TableHead>Competences</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stages.map((stage) => (
                                <TableRow key={stage.id}>
                                    <TableCell>{stage.id}</TableCell>
                                    <TableCell>{stage.title}</TableCell>
                                    <TableCell>{stage.entreprise}</TableCell>
                                    <TableCell>{stage.competences}</TableCell>
                                    <TableCell>{new Date(stage.start_at).toLocaleString(navigator.language, {
                                        "day": "numeric",
                                        "month": "long",
                                        "year": "numeric"
                                    })}</TableCell>
                                    <TableCell>{new Date(stage.end_at).toLocaleString(navigator.language, {
                                        "day": "numeric",
                                        "month": "long",
                                        "year": "numeric"
                                    })}</TableCell>
                                    <TableCell className={"space-x-2"}>
                                        <Link href={route("stage.edit", stage)}>Modifier</Link>
                                        <button onClick={() => handleDelete(stage.id)}>Supprimer</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className={"text-red-500"}>Aucun articles dans la BDD</p>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
