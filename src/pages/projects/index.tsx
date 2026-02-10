
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Project } from '@/components/types/project';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Desktop'] as const;
type CategoryFilter = typeof CATEGORIES[number];

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: api.fetchProjects,
    });

    const filteredProjects = (Array.isArray(projects) ? projects : []).filter((p: Project) => {
        // Category filter
        const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
        
        // Search filter
        const titleMatch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        let tagsMatch = false;
        try {
            if (p.tags) {
                const parsedTags = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
                if (Array.isArray(parsedTags)) {
                    tagsMatch = parsedTags.some((t: string | { value?: string; name?: string }) => (typeof t === 'string' ? t : (t.value || t.name || '')).toLowerCase().includes(searchTerm.toLowerCase()));
                }
            }
        } catch (e) {
            console.error("Error parsing tags for filter", e);
        }

        return categoryMatch && (titleMatch || tagsMatch);
    });

    return (
        <div className="pt-24 pb-20 min-h-screen container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 text-center max-w-3xl mx-auto" >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/60 tracking-tighter">
                    PROJECT ARCHIVE
                </h1>
                <p className="text-muted-foreground font-display text-lg">
                    Decrypted historical data of digital artifacts, applications, and experiments.
                </p>
            </motion.div>

            {/* Search and Filters */}
            <div className="mb-12 flex flex-col gap-4 glass p-4 rounded-xl border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <input type="text" placeholder="Filter by name or protocol..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-background/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-display text-sm" />
                    </div>
                    <div className="text-primary font-display text-xs">
                        {filteredProjects.length} RECORDS FOUND
                    </div>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                        <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg font-display text-sm transition-all ${ selectedCategory === category ? 'bg-primary text-primary-foreground border border-primary' : 'bg-white/5 border border-white/10 text-muted-foreground hover:border-primary/50'}`}>{category}</button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <div key={n} className="h-100 bg-card/50 glass animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project: Project, idx: number) => (
                        <ProjectCard key={project.id || idx} project={project} index={idx} />
                    ))}
                </div>
            )}

            {!isLoading && filteredProjects.length === 0 && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl glass">
                    <div className="text-destructive font-bold mb-2">404: NO DATA MATCHES FILTER</div>
                    <p className="text-muted-foreground font-display">Try adjusting your search parameters to find the target artifact.</p>
                </div>
            )}
        </div>
    );
}
