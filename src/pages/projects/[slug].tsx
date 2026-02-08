
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowLeft, ExternalLink, Github, Terminal, Database, Shield, Zap, User } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';

export default function ProjectDetails() {
    const router = useRouter();
    const { slug } = router.query;
    const projectSlug = typeof slug === 'string' ? slug : '';

    const { data: projectResponse, isLoading: projectLoading } = useQuery({
        queryKey: ['project', projectSlug],
        queryFn: () => api.getProjectDetails(projectSlug),
        enabled: !!projectSlug,
    });
    const { data: allProjectsResponse } = useQuery({
        queryKey: ['projects'],
        queryFn: api.fetchProjects,
    });
    const project = projectResponse;
    const similarProjects = (Array.isArray(allProjectsResponse) ? allProjectsResponse : []).filter((p: { slug?: string; id?: string | number }) => (p.slug || p.id) !== projectSlug).slice(0, 3);
    let tags: string[] = [];
    try {
        if (project?.tags) {
            const parsedTags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
            if (Array.isArray(parsedTags)) {
                tags = parsedTags.map((t: string | { value?: string; name?: string }) => typeof t === 'string' ? t : t.value || t.name || JSON.stringify(t));
            }
        }
    } catch (e) {
        console.error("Error parsing tags for details", e);
    }
    if (projectLoading || !projectSlug) {
        return (
            <div className="pt-32 min-h-screen flex flex-col items-center justify-center font-display">
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_20px_rgba(0,255,255,0.5)]" />
                <div className="animate-pulse">DECRYPTING SYSTEM DATA...</div>
            </div>
        );
    }
    if (!project) {
        return (
            <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4 font-display">
                <div className="text-destructive text-6xl font-bold mb-4">404</div>
                <h1 className="text-2xl font-bold mb-4 uppercase">Data Corrupted or Unreachable</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    The requested system artifact could not be retrieved from the main server. Access denied or file deleted.
                </p>
                <Link href="/projects" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> RETURN TO ARCHIVE
                </Link>
            </div>
        );
    }
    return (
        <div className="min-h-screen pb-20">
            {/* Banner / Header Section */}
            <div className="relative h-[65vh] w-full">
                <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-10" />
                <Image src={project.image || project.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000'} alt={project.name || project.title} fill className="absolute inset-0 w-full h-full object-cover" priority />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent z-20" />

                <div className="container relative z-30 h-full mx-auto px-4 flex flex-col justify-end pb-16">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors w-fit font-display text-sm uppercase group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Archives
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 rounded border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-8 tracking-tighter leading-none wrap-break-word">{project.name || project.title}</h1>

                        <div className="flex flex-wrap gap-4">
                            {(project.link || project.live_url) && (
                                <a href={project.link || project.live_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 md:px-8 bg-primary text-background font-bold rounded hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.4)] text-sm md:text-base">
                                    <ExternalLink size={18} /> LAUNCH PROTOCOL
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 md:px-8 bg-card border border-white/20 text-white font-bold rounded hover:border-white transition-all flex items-center gap-2 glass text-sm md:text-base">
                                    <Github size={18} /> VIEW SOURCE
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Main Content */}
            <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-primary" />
                            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Terminal size={20} className="text-primary" /> Project Intelligence
                            </h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground font-display text-lg leading-relaxed glass p-6 md:p-8 rounded-2xl border-white/5">
                            <p className="whitespace-pre-wrap">{project.content || project.description}</p>
                        </div>
                    </section>
                    {project.testmonials && (
                        <motion.section initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-primary/5 border-l-4 border-primary p-6 md:p-10 rounded-r-2xl relative overflow-hidden glass">
                            <Database className="absolute top-4 right-4 w-20 h-20 text-primary/10 -rotate-12" />
                            <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-2">
                                <User size={20} className="text-primary" /> FEEDBACK RECEIVED
                            </h3>
                            <blockquote className="text-2xl font-serif italic text-white/90 mb-10 leading-relaxed border-b border-primary/20 pb-10">
                                &quot;{project.testmonials?.content || "The result exceeded our expectations. The system architecture is robust and the user interface is intuitive and futuristic."}&quot;
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl border border-primary/50 flex items-center justify-center glass shadow-[0_0_15px_rgba(0,255,255,0.2)] overflow-hidden">
                                    {project.testmonials?.image ? (
                                        <Image src={project.testmonials.image} alt={project.testmonials?.name || "Client"} width={56} height={56} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={30} className="text-primary" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg tracking-tight">{project.testmonials?.name || 'Classified Client'}</div>
                                    <div className="text-xs text-primary font-display uppercase tracking-[0.2em]">{project.testmonials?.position || 'Validated Contact'}</div>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </div>
                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="glass p-8 rounded-2xl border-white/10 sticky top-24">
                        <h3 className="text-sm font-display font-black text-primary mb-6 border-b border-white/10 pb-4 uppercase tracking-[0.3em]">
                            Tech Specifications
                        </h3>
                        <div className="space-y-4">
                            {tags.map((tag: string) => (
                                <div key={tag} className="flex items-center justify-between text-sm group">
                                    <span className="text-muted-foreground font-display group-hover:text-white transition-colors">{tag}</span>
                                    <div className="flex gap-1">
                                        <Shield size={12} className="text-primary opacity-50" />
                                        <Zap size={12} className="text-accent opacity-50" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] mb-2 font-display">Status</div>
                            <div className="text-accent font-bold font-display tracking-widest animate-pulse">DEPLOYED // STABLE</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Similar Projects */}
            {similarProjects.length > 0 && (
                <section className="bg-card/30 border-t border-white/5 py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-16 px-4 border-l-4 border-secondary">
                            <h2 className="text-4xl font-display font-bold text-white tracking-widest">
                                KINDRED <span className="text-secondary">SYSTEMS</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {similarProjects.map((p: { id?: string | number; slug?: string }, idx: number) => (
                                <ProjectCard key={p.id || idx} project={p} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
