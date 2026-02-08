import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/ProjectCard';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, ChevronsDown } from 'lucide-react';
import ClientFeedbackSlider from '@/components/ClientFeedbackSlider';
import api from '@/lib/api';
import { Project } from '@/components/types/project';
import { Skill } from '@/components/types/Skill';

export default function Home() {
    const { data: projects, isLoading: projectsLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: api.fetchProjects,
    });

    const { data: skills } = useQuery({
        queryKey: ['skills'],
        queryFn: api.fetchSkills,
    });

    const featuredProjects = Array.isArray(projects) ? projects.slice(0, 3) : [];
    // Default featured icons if API doesn't provide them
    const clients = [
        {
            name: 'John Doe',
            role: 'CEO, Tech Corp',
            feedback: 'The system architecture designed was flawless. Performance improved by 300% after deployment.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop'
        },
        {
            name: 'Jane Smith',
            role: 'CTO, FinTech Corp',
            feedback: 'The system architecture designed was flawless. Performance improved by 300% after deployment.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop'
        },
        {
            name: 'John Doe',
            role: 'CEO, Tech Corp',
            feedback: 'The system architecture designed was flawless. Performance improved by 300% after deployment.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop'
        },
        {
            name: 'Jane Smith',
            role: 'CTO, FinTech Corp',
            feedback: 'The system architecture designed was flawless. Performance improved by 300% after deployment.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop'
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
                <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-6 inline-block px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary text-xs font-display tracking-widest uppercase" >System initialized • Kernel v1.0.4</motion.div>
                    <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight leading-none">
                        <span className="text-white">FULL STACK</span>
                        <br />
                        <span className="bg-clip-text bg-linear-to-r from-primary via-secondary to-accent text-glow">DEVELOPER</span>
                    </h1>
                    <div className="text-xl md:text-2xl text-muted-foreground mb-12 h-12 font-display">
                        <TypeAnimation sequence={['Building digital experiences.', 2000, 'Architecting scalable systems.', 2000, 'Designing futuristic interfaces.', 2000,]} wrapper="span" speed={50} repeat={Infinity} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/projects" className="px-8 py-4 bg-primary text-background font-bold rounded hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group" >PROJECT ARCHIVE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
                        <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded hover:border-primary hover:text-primary transition-all flex items-center justify-center" >ESTABLISH CONTACT</Link>
                    </div>
                </div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-primary/50" >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[15px] font-display uppercase tracking-[0.3em]">
                            <ChevronsDown />
                        </span>
                    </div>
                </motion.div>
            </section>
            {/* Skills Marquee */}
            <div className="bg-card/50 border-y border-white/5 py-12 overflow-hidden relative">
                <div className="flex whitespace-nowrap">
                    <motion.div className="flex gap-12 items-center px-6 min-w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30, repeatType: "loop" }} >
                        {Array.isArray(skills) && skills.length > 0 ? [...skills, ...skills].map((skill: Skill, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-primary/70 hover:text-primary transition-colors group cursor-default">
                                <div className="relative w-8 h-8 group-hover:scale-110 transition-transform">
                                    <Image src={skill.image} alt={skill.name} fill className="object-contain" />
                                </div>
                                <span className="text-lg font-display tracking-wider uppercase font-bold">{skill.name}</span>
                            </div>
                        )) : null}
                    </motion.div>
                </div>
                <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
            </div>
            {/* Featured Projects */}
            <section className="py-24 container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">
                            FEATURED
                            <span className="text-primary">ARTIFACTS</span>
                        </h2>
                        <p className="text-muted-foreground font-display">Selected high-impact deployments</p>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors font-display uppercase tracking-widest mt-4 md:mt-0">
                        View All Files
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsLoading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 text-primary/60">
                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                            <p className="text-sm font-mono tracking-wider uppercase">Loading projects...</p>
                        </div>) : (featuredProjects.map((project: Project, idx: number) => (
                            <ProjectCard key={project.id || idx} project={project} index={idx} />
                        )))
                    }
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/projects" className="inline-flex py-4 px-8 border border-primary/30 text-primary font-bold rounded w-full justify-center">VIEW ALL PROJECTS</Link>
                </div>
            </section>

            {/* Client Feedback Section */}
            <section className="py-24 bg-primary/5 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">
                            CLIENT
                            <span className="text-primary">INTEL</span>
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <ClientFeedbackSlider clients={clients} />
                </div>
            </section>
        </div>
    );
}
