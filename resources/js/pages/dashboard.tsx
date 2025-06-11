import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type ArticleProps = {
    id: number;
    path: string;
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
                <Table>
                    <TableCaption>Liste des projets</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Identifiant</TableHead>
                            <TableHead>Images</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((art) => (
                            <TableRow>
                                <TableCell>
                                    {art.id}
                                </TableCell>
                                <TableCell>
                                    <img src={"storage/" + art.path} alt={art.path}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
