import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

type ArticleProps = {
    id: number;
    title: string;
    path: string;
}

export default function Welcome() {
    const { articles } = usePage<SharedData & { articles: ArticleProps[] }>().props;

    return (
        <div className={"pb-5 text-white"}>
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <main className={"container mx-auto"}>
                <h1 className={"text-5xl py-5 font-bold uppercase"}>Florian GRAZIANI</h1>
                <div className={"grid lg:grid-cols-2"}>
                    <div>
                        <h2>A propos</h2>
                        <ul className={'list-disc list-inside'}>
                            <li>Né le 11 Juillet 1999 a Annecy</li>
                        </ul>
                        <h2>Compétences actuelles : </h2>
                        <ul className={"list-disc list-inside"}>
                            <li>Java : Création de mods et de plugins pour Minecraft</li>
                            <li>
                                <span>Développeur web full stack :</span>
                                <ul className={"list-disc list-inside px-5"}>
                                    <li>HTML : Mise en place des données</li>
                                    <li>CSS : Tailwind CSS</li>
                                    <li>JS : React / TypeScript / ViteJS</li>
                                    <li>PHP : Laravel & SQL pour les bases de données</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <h2 className={"pb-0"}>Parcours professionnel</h2>
                        <ul className={'list-disc list-inside'}>
                            <li>Janvier 2023 : Stage de 2 semaines chez DevCSI</li>
                        </ul>
                        <Link href={route('contact')} className={'p-2.5 rounded hover:underline bg-white text-black self-start'}>Nous contacter</Link>
                    </div>
                </div>
                <h2 className={"py-20 text-4xl uppercase font-semibold"}>Liste des projets</h2>
                <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-10 lg:p-0"}>
                    {articles.map((article) => (
                        <figure key={article.id} className={"rounded-3xl bg-white h-100 flex flex-col shadow-2xs"}>
                            <img src={"/storage/" + article.path} alt={""} className={"rounded-t-3xl w-full h-7/10 object-cover"} />
                            <figcaption className={"text-black px-5 flex flex-col justify-between grow pb-5"}>
                                <h3 className={"uppercase font-semibold text-2xl"}>{article.title}</h3>
                                <Link href={route("article.show", article)} className={"hover:underline"}>En voir plus</Link>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </main>
        </div>
    );
}
