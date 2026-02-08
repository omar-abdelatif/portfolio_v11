'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: string;
    slug: string;
    title: string;
    short_description?: string;
    image_url: string;
    tags: string[];
    live_url?: string;
    github_url?: string;
    is_featured?: boolean;
}

export default function ProjectCard({ project, index }: { project: any; index: number }) {
    // Mapping API fields
    const title = project.name || project.title || "Project Alpha";
    const description = project.description || project.short_description || "Secure encrypted data module.";
    const image = project.image || project.image_url || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400`;
    const liveUrl = project.link || project.live_url;

    // Handle tags which might be a JSON string from the API
    let tags: string[] = ["System", "Nexus"];
    try {
        if (project.tags) {
            const parsedTags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
            if (Array.isArray(parsedTags)) {
                tags = parsedTags.map((t: any) => typeof t === 'string' ? t : t.value || t.name || JSON.stringify(t));
            }
        }
    } catch (e) {
        console.error("Error parsing tags", e);
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group relative bg-card/40 glass overflow-hidden rounded-lg hover:border-primary/50 transition-all duration-500" >
            <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center gap-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Link href={`/projects/${project.slug || project.id}`} className="px-6 py-2 bg-background/90 text-primary border border-primary hover:bg-primary hover:text-background font-bold uppercase text-xs tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)]">Access Data</Link>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                        {title}
                    </h3>
                    {project.is_featured && (
                        <span className="text-[10px] font-display text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 rounded animate-pulse uppercase tracking-widest">
                            PRIME
                        </span>
                    )}
                </div>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2 font-display leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] font-display uppercase tracking-wider px-2 py-1 rounded-sm bg-secondary/10 text-secondary border border-secondary/20">{tag}</span>
                    ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5 font-display">
                    <div className="flex gap-4">
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener" className="text-muted-foreground hover:text-white transition-colors">
                                <Github size={18} />
                            </a>
                        )}
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors">
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                    <Link href={`/projects/${project.slug || project.id}`} className="text-primary/50 group-hover:text-primary transition-colors">
                        <Terminal size={18} />
                    </Link>
                </div>
            </div>

            {/* Cyberpunk corner accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
