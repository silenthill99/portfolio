import { Head, Link, usePage } from '@inertiajs/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Article } from '@/types';
import { home } from '@/routes';
import { ArrowLeft, ExternalLink, Github, Target } from 'lucide-react';

const Show = () => {
    const { article, images } = usePage<{ article: Article; images?: string[] }>().props;

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Head title={article.title} />

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -left-40 bottom-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            <div className="container relative mx-auto px-4 py-12">
                {/* Back button */}
                <Link
                    href={home()}
                    className="mb-8 inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour à l'accueil
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl animate-fade-in">
                        {article.title}
                    </h1>
                </header>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Carousel section */}
                    <div className="animate-fade-in-up">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {article.image_url && (
                                    <CarouselItem>
                                        <div className="overflow-hidden rounded-xl border border-slate-700/50">
                                            <img
                                                src={article.image_url}
                                                alt={article.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                )}
                                {images &&
                                    images.length > 0 &&
                                    images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <div className="overflow-hidden rounded-xl border border-slate-700/50">
                                                <img
                                                    src={image}
                                                    alt={`Image ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 border-slate-600 bg-slate-800/80 text-white hover:bg-slate-700 hover:text-white" />
                            <CarouselNext className="right-2 border-slate-600 bg-slate-800/80 text-white hover:bg-slate-700 hover:text-white" />
                        </Carousel>
                    </div>

                    {/* Content section */}
                    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        {/* Description card */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg bg-blue-500/20 p-2">
                                    <Target className="h-5 w-5 text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Objectif</h2>
                            </div>
                            <p className="leading-relaxed text-slate-300">{article.description}</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-4">
                            {article.link && (
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-5 py-3 font-medium text-white transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Voir le projet
                                </a>
                            )}
                            {article.github && (
                                <a
                                    href={article.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-5 py-3 font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-700"
                                >
                                    <Github className="h-4 w-4" />
                                    Code source
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
