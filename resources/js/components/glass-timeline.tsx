import { Stage } from '@/types';
import { Building2, Calendar } from 'lucide-react';

type Props = {
    stages: Stage[];
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric',
    });
};

const GlassTimeline = ({ stages }: Props) => {
    return (
        <div className="relative">
            {/* Vertical timeline for all screens */}
            <div className="relative mx-auto max-w-2xl">
                {/* Vertical line */}
                <div className="absolute top-0 left-4 h-full w-px bg-linear-to-b from-slate-500 via-slate-600 to-transparent md:left-1/2" />

                {stages.map((stage, index) => (
                    <div
                        key={stage.id}
                        className="relative mb-12 animate-fade-in-up last:mb-0"
                        style={{
                            animationDelay: `${index * 150}ms`,
                        }}
                    >
                        {/* Timeline point */}
                        <div className="absolute top-6 left-4 -translate-x-1/2 md:left-1/2">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-800">
                                <Building2 className="h-4 w-4 text-blue-400" />
                                {/* Subtle glow */}
                                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
                            </div>
                        </div>

                        {/* Card - alternating sides on desktop */}
                        <div
                            className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                                index % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'
                            }`}
                        >
                            <div className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-5 transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-700/80">
                                {/* Date badge */}
                                <div
                                    className={`mb-3 inline-flex items-center gap-2 text-xs text-slate-400 ${
                                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                        {formatDate(stage.start_at)}
                                        {stage.end_at && ` — ${formatDate(stage.end_at)}`}
                                    </span>
                                </div>

                                {/* Title */}
                                <h4 className="my-0 text-lg font-semibold text-white">{stage.title || 'Stage'}</h4>

                                {/* Company */}
                                <p className="mt-1 text-sm text-slate-300">{stage.entreprise}</p>

                                {/* Competences */}
                                {stage.competences && (
                                    <div className={`mt-3 flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">
                                            {stage.competences.replace(/\n+/g, ' • ').trim()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GlassTimeline;
