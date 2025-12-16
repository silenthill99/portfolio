import React from 'react';

const HeroSection = () => {
    return (
        <section className={'relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-background to-muted/20'}>
            <div className={"absolute inset-0 overflow-hidden"}>
                <div className={"absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse"}/>
                <div className={"absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse"}/>
            </div>
            <div className="container relative z-10 mx-auto text-center">
                <h1
                    className="mb-4 text-6xl font-bold animate-fade-in"
                >
                    Florian GRAZIANI
                </h1>
                <p
                    className="mb-4 text-2xl animate-fade-in-up"
                >
                    Développeur full-stack
                </p>
                <p
                    className="mb-4 text-lg text-muted-foreground animate-fade-in-up"
                >
                    Je crée des applications web modernes avec :
                </p>
                <ul
                    className="inline-block list-inside list-disc text-left text-lg animate-fade-in-up"
                >
                    <li>Laravel</li>
                    <li>React avec TypeScript</li>
                    <li>TailwindCSS</li>
                </ul>
            </div>
        </section>
    );
};

export default HeroSection;
