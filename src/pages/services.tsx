
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu, Globe, Layout, Smartphone } from 'lucide-react';

const services = [
    {
        title: "Web Development",
        description: "Building responsive, high-performance web applications using modern frameworks.",
        icon: Globe
    },
    {
        title: "Mobile App Development",
        description: "Creating native and cross-platform mobile experiences for iOS and Android.",
        icon: Smartphone
    },
    {
        title: "UI/UX Design",
        description: "Designing intuitive and visually stunning user interfaces.",
        icon: Layout
    },
    {
        title: "System Architecture",
        description: "Designing scalable and robust backend systems and APIs.",
        icon: Cpu
    },
    {
        title: "Code Refactoring",
        description: "Optimizing and modernizing legacy codebases for better performance.",
        icon: Code2
    },
    {
        title: "DevOps & Deployment",
        description: "Streamlining CI/CD pipelines and cloud infrastructure management.",
        icon: Terminal
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen py-24 container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
                    MY <span className="text-primary">SERVICES</span>
                </h1>
                <p className="text-muted-foreground font-display max-w-2xl">
                    Comprehensive technical solutions engineered for scale and performance.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, idx) => {
                    const Icon = service.icon;
                    return (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-card/30 glass p-8 rounded-lg border border-white/5 hover:border-2 hover:border-primary/50 group transition-all duration-300" >
                            <div className="mb-6 p-4 rounded bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                                <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                            <p className="text-muted-foreground font-display text-sm leading-relaxed">{service.description}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
