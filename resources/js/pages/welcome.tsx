import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className={"h-screen bg-gray-800"}>
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <main className={"container mx-auto text-white relative"}>
                <h1 className={"text-5xl py-5 font-bold uppercase"}>Mon portfolio</h1>
                <p>Compétences actuelles : </p>
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
                <Link href={route('dashboard')} className={"absolute top-5 right-5"}>Page administrateur</Link>
            </main>
        </div>
    );
}
