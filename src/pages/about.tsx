
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Code2, Rocket, Heart, Coffee, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';

export default function About() {
    const { data: aboutResponse } = useQuery({
        queryKey: ['about'],
        queryFn: api.fetchAbout,
    });

    const aboutData = Array.isArray(aboutResponse) ? aboutResponse[0] : aboutResponse;
    const about = aboutData || {
        name: 'Alex Dev',
        role: 'Full Stack Engineer',
        description: 'Pioneering digital frontiers through code. Specializing in highly performant, aesthetic systems that redefine user experience.',
        experience: '5+ Years',
        projects_completed: '50+'
    };

    const experienceCards = [
        { title: 'Runtime', value: about.experience || '5+ Years', icon: Rocket, color: 'text-primary' },
        { title: 'Artifacts', value: about.projects_completed || '50+', icon: Code2, color: 'text-secondary' },
        { title: 'Reputation', value: 'Elite', icon: ShieldCheck, color: 'text-accent' },
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                {/* Left Column: Text Content */}
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1 h-8 bg-primary rounded-full" />
                            <div className="text-primary font-display text-sm tracking-widest uppercase">System Profile</div>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-none mb-4">
                            {about.name || 'OMAR'} <span className="text-primary text-glow">_DEV</span>
                        </h1>
                        <h2 className="text-2xl text-muted-foreground font-display uppercase tracking-widest">
                            {about.role || 'Full Stack Architect'}
                        </h2>
                    </div>

                    <div className="space-y-6 text-muted-foreground text-xl leading-relaxed font-display">
                        <p className="border-l-2 border-primary/20 pl-6 py-2">
                            {about.description || "Hello! I'm a developer with a passion for creating cinematic web experiences. My journey is documented in lines of code and high-performance pixels."}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                            {experienceCards.map((card, idx) => (
                                <div key={idx} className="glass p-6 rounded-xl border-white/5 hover:border-white/20 transition-all group">
                                    <card.icon className={`${card.color} mb-4 group-hover:scale-110 transition-transform`} size={24} />
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{card.title}</div>
                                    <div className="text-2xl font-bold text-white">{card.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col gap-6">
                        <h3 className="text-lg font-display font-bold text-white border-b border-primary/20 pb-2 w-fit">HABITUAL PROTOCOLS</h3>
                        <div className="flex flex-wrap gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2 font-display text-sm">
                                <Coffee size={18} className="text-primary" /> CAFFEINE.OVERLOAD()
                            </div>
                            <div className="flex items-center gap-2 font-display text-sm">
                                <Heart size={18} className="text-secondary" /> NEOPHOTIC_AESTHETICS
                            </div>
                            <div className="flex items-center gap-2 font-display text-sm">
                                <Rocket size={18} className="text-accent" /> FAST_ITERATION.INIT()
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Visual Artifact */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-r from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-1000" />

                    <div className="relative glass rounded-3xl overflow-hidden border-white/10 aspect-4/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 scanline z-20" />

                        {/* Terminal Window Header */}
                        <div className="absolute top-0 left-0 right-0 h-10 glass border-x-0 border-t-0 z-30 flex items-center px-4 justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                                <div className="w-3 h-3 rounded-full bg-accent/50" />
                                <div className="w-3 h-3 rounded-full bg-primary/50" />
                            </div>
                            <div className="text-[10px] font-display text-muted-foreground uppercase tracking-widest">profile.exe</div>
                        </div>

                        {/* Code Content */}
                        <div className="pt-20 px-8 pb-8 font-display text-sm sm:text-base leading-relaxed overflow-hidden h-full">
                            <pre className="text-white space-y-2">
                                <p className="text-secondary"># SYSTEM MANIFEST</p>
                                <p><span className="text-primary">import</span> {'{ Skillset }'} <span className="text-primary">from</span> <span className="text-accent">`{'@nexus/core'}`</span>;</p>
                                <div className="mt-8 space-y-1">
                                    <p><span className="text-primary">const</span> <span className="text-white text-glow">Developer</span> = {'{'}</p>
                                    <p className="ml-4">name: <span className="text-accent">`{about.name || 'Alex'}`</span>,</p>
                                    <p className="ml-4">role: <span className="text-accent">`{about.role || 'Full Stack'}`</span>,</p>
                                    <p className="ml-4">status: <span className="text-accent">{'AWAKE'}</span>,</p>
                                    <p className="ml-4">engine: <span className="text-accent">{'V8/TURBO'}</span>,</p>
                                    <p className="ml-4">stack: [</p>
                                    <p className="ml-8 text-accent">{'React.js'},</p>
                                    <p className="ml-8 text-accent">{'Next.js'},</p>
                                    <p className="ml-8 text-accent">{'Node.js'},</p>
                                    <p className="ml-8 text-accent">{'TailwindCSS'},</p>
                                    <p className="ml-8 text-accent">{'TypeScript'}</p>
                                    <p className="ml-4">],</p>
                                    <p className="ml-4">passion: <span className="text-primary">Infinity</span>,</p>
                                    <p>{'};'}</p>
                                </div>
                                <div className="mt-8">
                                    <p className="text-accent animate-pulse">SYSTEM STATUS: OPTIMAL</p>
                                    <div className="w-full bg-white/5 h-1 mt-2 rounded">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-primary shadow-[0_0_10px_#00ffff]" />
                                    </div>
                                </div>
                            </pre>
                        </div>
                    </div>

                    {/* Floating UI Elements */}
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-10 -right-10 glass p-4 rounded-xl border-primary/30 z-40 hidden md:block">
                        <div className="text-[10px] text-primary font-display mb-1 tracking-widest uppercase">Connectivity</div>
                        <div className="text-xl font-bold font-display">1.2 GB/S</div>
                    </motion.div>

                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-8 -left-8 glass p-4 rounded-xl border-secondary/30 z-40 hidden md:block">
                        <div className="text-[10px] text-secondary font-display mb-1 tracking-widest uppercase">Location</div>
                        <div className="text-xl font-bold font-display">NORTH-ATL-4</div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
