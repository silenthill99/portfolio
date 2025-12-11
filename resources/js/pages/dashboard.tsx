import AppLayout from '@/layouts/app-layout';
import { Article, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { create, update } from '@/routes';
import article from '@/routes/article';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];



export default function Dashboard() {

    const { articles } = usePage<{ articles: Article[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Button className={"self-start"} onClick={() => {
                    router.visit(create())
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
                                        <img src={"storage/" + art.path} alt={art.path} className={"w-full h-40 object-cover shadow"}/>
                                    </TableCell>
                                    <TableCell>
                                        {art.description}
                                    </TableCell>
                                    <TableCell>
                                        <span>{new Date(art.created_at).toLocaleString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <ul className={"flex gap-2"}>
                                            <Link href={article.show({article: art})} className={"hover:underline"}>Voir</Link>
                                            <Link href={update({slug: art.slug})} className={"hover:underline"}>Modifier</Link>
                                            <button onClick={() => router.delete(article.destroy({article: art}))} className={"hover:underline"}>Supprimer</button>
                                        </ul>
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
