import { Article, PaginatedProps, type SharedData, Stage } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import PaginatedButton from '@/components/paginated-button';
import HeroSection from '@/components/hero-section';
import { Timeline, TimelineContent, TimelineItem, TimelinePoint, TimelineTime, TimelineTitle } from 'flowbite-react';
import SoundCustom from '@/components/sound-custom';

export default function Welcome() {
    const { articles, stages } = usePage<SharedData & { articles: PaginatedProps<Article>, stages: Stage[] }>().props;

    return (
        <div className={'pb-5 text-white'}>
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <main>
                <HeroSection />
                <SoundCustom />
                <div className={'container mx-auto'}>
                    <h2 className={'py-20 text-4xl font-semibold uppercase'}>Liste des projets</h2>
                    <div className={'grid gap-10 p-10 md:grid-cols-2 lg:grid-cols-3 lg:p-0'}>
                        {articles.data.map((article) => (
                            <figure key={article.id} className={'flex h-100 flex-col rounded-3xl bg-white shadow-2xs'}>
                                <img src={'/storage/' + article.path} alt={''} className={'h-7/10 w-full rounded-t-3xl object-cover'} />
                                <figcaption className={'flex grow flex-col justify-between border-t p-5 px-5 text-black'}>
                                    <h3 className={'text-2xl font-semibold uppercase'}>{article.title}</h3>
                                    <Link href={show({ article: article })} className={'hover:underline'}>
                                        En voir plus
                                    </Link>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <PaginatedButton pages={articles} className="my-5" />
                </div>
                <section className={'container mx-auto'}>
                    <h2>Expériences professionnelles</h2>
                    <h3>Stages</h3>
                    <Timeline horizontal>
                        {stages.map((stage) => (
                            <TimelineItem key={stage.id}>
                                <TimelinePoint />
                                <TimelineContent>
                                    <TimelineTime>{new Date(stage.start_at).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        year: "numeric",
                                        month: "long"
                                    })} {stage.end_at && (" - " + new Date(stage.end_at).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        year: "numeric",
                                        month: "long"
                                    }))}</TimelineTime>
                                    <TimelineTitle className={'text-white'}>DevCSI</TimelineTitle>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </section>
            </main>
        </div>
    );
}
