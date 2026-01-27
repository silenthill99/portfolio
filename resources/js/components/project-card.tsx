import { Article } from '@/types';
import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import { ArrowRight } from 'lucide-react';

type Props = {
    article: Article;
    index?: number;
};

const ProjectCard = ({ article, index = 0 }: Props) => {
    return (
        <Link
            href={show({ article: article })}
            className="group relative block animate-fade-in-up overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80 transition-all duration-500 hover:border-slate-600/50 hover:bg-slate-700/80"
            style={{
                animationDelay: `${index * 100}ms`,
            }}
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={'/storage/' + article.path}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-6">
                <h3 className="my-0 text-xl font-semibold text-white transition-colors">
                    {article.title}
                </h3>
                {article.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                        {article.description.substring(0, 120)}
                        {article.description.length > 120 ? '...' : ''}
                    </p>
                )}

                {/* Link indicator */}
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-all duration-300 group-hover:gap-3 group-hover:text-blue-300">
                    Voir le projet
                    <ArrowRight className="h-4 w-4" />
                </div>
            </div>

            {/* Decorative blob on hover */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
    );
};

export default ProjectCard;
