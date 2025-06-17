import { Head, usePage } from '@inertiajs/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type ArticleProps = {
    title: string;
    path: string;
    link: string;
    github: string;
}

const Show = () => {
    const { article, images } = usePage<{article: ArticleProps, images: string[]}>().props;
    return (
        <div className={"min-h-screen bg-gray-800 text-white"}>
            <Head title={article.title} />
            <div className={'container mx-auto'}>
                <h1>{article.title}</h1>
                <Carousel className={"w-1/2"}>
                    <CarouselContent>
                        <CarouselItem>
                            <img src={`/storage/${article.path}`} alt=""  />
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
                <a href={article.github} target={'_blank'}>Lien github</a>
            </div>
        </div>
    );
};

export default Show;
