import { Article, PaginatedProps, type SharedData, Stage } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import PaginatedButton from '@/components/paginated-button';
import HeroSection from '@/components/hero-section';
import ProjectCard from '@/components/project-card';
import GlassTimeline from '@/components/glass-timeline';
import ScrollNavbar from '@/components/scroll-navbar';

export default function Welcome() {
    const { articles, stages } = usePage<SharedData & { articles: PaginatedProps<Article>, stages: Stage[] }>().props;

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ScrollNavbar />
            <main>
                <div id="hero">
                    <HeroSection />
                </div>

                {/* Projects section */}
                <section id="projects" className="relative overflow-hidden bg-slate-800/50 py-24">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
                        <div className="absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
                    </div>

                    <div className="container relative mx-auto px-4">
                        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl animate-fade-in">
                            Mes Projets
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-300 animate-fade-in-up">
                            Découvrez mes réalisations et projets personnels
                        </p>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.data.map((article, index) => (
                                <ProjectCard key={article.id} article={article} index={index} />
                            ))}
                        </div>
                        <PaginatedButton pages={articles} className="mt-12" />
                    </div>
                </section>

                {/* Timeline section */}
                <section id="experience" className="relative overflow-hidden bg-slate-900 py-24">
                    {/* Decorative blob */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="container relative mx-auto px-4">
                        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl animate-fade-in">
                            Expériences professionnelles
                        </h2>
                        <p className="mx-auto mb-16 max-w-2xl text-center text-slate-300 animate-fade-in-up">
                            Mon parcours et mes stages
                        </p>
                        <GlassTimeline stages={stages} />
                    </div>
                </section>
            </main>
        </div>
    );
}
