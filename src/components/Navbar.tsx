'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Terminal, Code2, Cpu, User, Mail, TextAlignJustify } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const links = [
        { href: "/", label: "Home", icon: Terminal },
        { href: "/projects", label: "Projects", icon: Code2 },
        { href: "/services", label: "Services", icon: Cpu },
        { href: "/about", label: "About", icon: User },
        { href: "/contact", label: "Contact", icon: Mail },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] glass border-x-0 border-t-0 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-display font-bold text-white flex items-center gap-2 group tracking-tighter">
                    <div className="bg-primary/10 p-2 rounded border border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">
                        <Terminal className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-wider text-white hidden sm:block">
                        OMAR_ABDELATIF<span className="text-primary animate-pulse">_</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 font-display text-sm">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                            <Link key={link.href} href={link.href} className={cn("relative px-3 py-2 rounded-md text-sm font-bold transition-all duration-300 flex items-center gap-2", active ? "text-primary bg-primary/10 border border-primary/30" : "text-muted-foreground hover:text-primary hover:bg-primary/5",)}>
                                <div className={cn("p-2 rounded border transition-all", active ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,255,255,0.3)]" : "border-white/10 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]")}>
                                    <Icon className={cn("w-5 h-5 transition-colors", active ? "text-primary" : "text-white group-hover:text-primary")} />
                                </div>
                                <span className={cn("uppercase tracking-widest font-bold hidden sm:block transition-colors", active ? "text-primary" : "group-hover:text-primary")}>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white hover:text-primary transition-colors" aria-label="Toggle Menu" ><TextAlignJustify className=""/></button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden glass absolute top-full left-0 right-0 border-x-0 p-6 flex flex-col gap-6 font-display text-sm shadow-2xl"
                    >
                        {links.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={cn("flex items-center gap-2 hover:text-primary transition-colors uppercase tracking-widest border-b border-white/5 pb-2", active ? "text-primary" : "text-white")}>
                                    <Icon className={cn("w-5 h-5 group-hover:text-primary", active ? "text-primary" : "text-white")} />
                                    <span className="font-bold group-hover:text-primary transition-colors"> {link.label} </span>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
