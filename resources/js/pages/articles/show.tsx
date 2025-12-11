import { Head, Link, usePage } from '@inertiajs/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Article } from '@/types';
import { home } from '@/routes';

const Show = () => {
    const { article, images } = usePage<{article: Article, images: string[]}>().props;
    return (
        <>
            <Head title={article.title} />
            <div className={'container mx-auto text-white'}>
                <h1>{article.title}</h1>
                <Carousel className={"lg:w-1/2 w-3/4 mx-auto lg:mx-0"}>
                    <CarouselContent>
                        <CarouselItem>
                            <img src={`/storage/${article.path}`} alt="" className={"w-full h-full object-cover"}/>
                        </CarouselItem>
                        {images.length > 0 && (
                            images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <img src={image} alt={`Image ${index + 1}`} className={"w-full h-full object-cover"}/>
                                </CarouselItem>
                            ))
                        )}
                    </CarouselContent>
                    <CarouselPrevious className={"text-black"}/>
                    <CarouselNext className={"text-black"}/>
                </Carousel>
                <a href={article.link} target={'_blank'}>Lien du projet</a> <br />
                <a href={article.github} target={'_blank'}>Lien github</a> <br/>
                <Link href={home()}>Retour à la page d'accueil</Link>
                <h2 className={"underline"}>Objectif</h2>
                <p>{article.description}</p>
            </div>
        </>
    );
};

export default Show;
