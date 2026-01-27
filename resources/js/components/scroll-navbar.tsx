import { useEffect, useState } from 'react';
import { Home, Briefcase, FolderOpen } from 'lucide-react';

const ScrollNavbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar after scrolling 100px
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100);

            // Determine active section
            const sections = ['hero', 'projects', 'experience'];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'hero', label: 'Accueil', icon: Home },
        { id: 'projects', label: 'Projets', icon: FolderOpen },
        { id: 'experience', label: 'Expériences', icon: Briefcase },
    ];

    return (
        <nav
            className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-500 ${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0 pointer-events-none'
            }`}
        >
            <div className="flex items-center gap-1 rounded-full border border-slate-700/50 bg-slate-900/90 px-2 py-2 shadow-lg backdrop-blur-xl">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                isActive
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default ScrollNavbar;
