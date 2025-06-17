import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];

type ArticleProps = {
    id: number;
    title: string;
    path: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export default function Dashboard() {

    const { articles } = usePage<{ articles: ArticleProps[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Button className={"self-start"} onClick={() => {
                    router.visit(route('create'))
                }}>Créer un article</Button>
                {articles.length > 0 ? (
                    <Table>
                        <TableCaption>Liste des projets</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Identifiant</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Images</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Date d'ajout</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((art) => (
                                <TableRow>
                                    <TableCell>
                                        {art.id}
                                    </TableCell>
                                    <TableCell>
                                        {art.title}
                                    </TableCell>
                                    <TableCell>
                                        <img src={"storage/" + art.path} alt={art.path} className={"w-full h-40 object-cover"}/>
                                    </TableCell>
                                    <TableCell>
                                        {art.description}
                                    </TableCell>
                                    <TableCell>
                                        <span>{new Date(art.created_at).toLocaleString()}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                            </TableRow>
                        </TableBody>
                    </Table>
                ) : (
                    <p>Aucun articles disponibles</p>
                )}
            </div>
        </AppLayout>
    );
}
