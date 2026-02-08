
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: api.fetchProjects,
    });

    const filteredProjects = (Array.isArray(projects) ? projects : []).filter((p: any) => {
        const titleMatch = (p.name || p.title || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        let tagsMatch = false;
        try {
            if (p.tags) {
                const parsedTags = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
                if (Array.isArray(parsedTags)) {
                    tagsMatch = parsedTags.some((t: any) => 
                        (typeof t === 'string' ? t : (t.value || t.name || '')).toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
            }
        } catch (e) {
            console.error("Error parsing tags for filter", e);
        }

        return titleMatch || tagsMatch;
    });

    return (
        <div className="pt-24 pb-20 min-h-screen container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 text-center max-w-3xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tighter">
                    PROJECT ARCHIVE
                </h1>
                <p className="text-muted-foreground font-display text-lg">
                    Decrypted historical data of digital artifacts, applications, and experiments.
                </p>
            </motion.div>

            {/* Search and Filters */}
            <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between glass p-4 rounded-xl border-white/10">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Filter by name or protocol..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background/50 border border-white/10 rounded-lg py-3 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-display text-sm"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 text-white font-display text-sm transition-all text-muted-foreground">
                        <Filter size={16} /> TAGS
                    </button>
                    <div className="text-primary font-display text-xs hidden md:block">
                        {filteredProjects.length} RECORDS FOUND
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <div key={n} className="h-[400px] bg-card/50 glass animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project: any, idx: number) => (
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
