'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Client {
    name: string;
    role: string;
    feedback: string;
    image: string;
}

interface ClientFeedbackSliderProps {
    clients: Client[];
}

export default function ClientFeedbackSlider({ clients }: ClientFeedbackSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            let newItemsPerPage = 1;
            if (window.innerWidth >= 1024) {
                newItemsPerPage = 3;
            } else if (window.innerWidth >= 768) {
                newItemsPerPage = 2;
            }
            setItemsPerPage(newItemsPerPage);
            setCurrentIndex((prev) => Math.min(prev, Math.max(0, clients.length - newItemsPerPage)));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [clients.length]);
    const maxIndex = Math.max(0, clients.length - itemsPerPage);
    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };
    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden relative">
                <motion.div className="flex gap-8" animate={{ x: `calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (32 / itemsPerPage)}px)` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} >
                    {clients.map((client, idx) => (
                        <div key={idx} className="bg-card/40 glass p-8 rounded-xl border border-white/5 relative group hover:border-primary/50 transition-colors flex-shrink-0" style={{ width: `calc((100% - ${(itemsPerPage - 1) * 32}px) / ${itemsPerPage})` }} >
                            <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                                <Quote size={40} />
                            </div>
                            <p className="text-muted-foreground font-display text-lg mb-8 italic relative z-10 min-h-[120px]">"{client.feedback}"</p>
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/50">
                                    <Image src={client.image} alt={client.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">{client.name}</h4>
                                    <p className="text-xs text-primary font-mono">{client.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
                <button onClick={prevSlide} disabled={currentIndex === 0} className="p-3 rounded-full border border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all" >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2 items-center">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentIndex(idx)} className={cn( "w-2 h-2 rounded-full transition-all", currentIndex === idx ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50" )}  />
                    ))}
                </div>
                <button onClick={nextSlide} disabled={currentIndex === maxIndex} className="p-3 rounded-full border border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all" >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
