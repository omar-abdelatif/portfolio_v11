
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchSocialLinks, fetchAbout } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface SocialLink {
    url: string,
    platform_icon: string,
    platform?: string,
    status: string,
}

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [socialData, setSocialData] = useState<SocialLink[]>([]);
    const [aboutData, setAboutData] = useState<{ email?: string; phone?: string } | null>(null);
    useEffect(() => {
        const getSocialData = async () => {
            try {
                const data = await fetchSocialLinks();
                setSocialData(data);
            } catch (error) {
                console.error('Error fetching social data:', error);
            }
        };
        const getAboutData = async () => {
            try {
                const data = await fetchAbout();
                const about = Array.isArray(data) ? data[0] : data;
                setAboutData(about);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        getSocialData();
        getAboutData();
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                // Auto-reset after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('Form submission error:', data);
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };
    return (
        <>
            <section className="contact-wrapper my-8">
                {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        Thank you for your message! I&apos;ll get back to you soon.
                    </div>
                )}
                <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter" >
                                ESTABLISH <span className="text-primary text-glow">CONTACT</span>
                            </motion.h1>
                            <p className="text-muted-foreground font-display">Secure communication channel for project inquiries and system collaborations.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Info */}
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8" >
                                <div className="glass p-8 rounded-2xl border-white/10 space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-display text-primary uppercase tracking-widest mb-1">Electronic Mail</div>
                                            <div className="text-xl font-bold text-white">{aboutData?.email || 'nexus@adendan.com'}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                                            <MessageSquare size={24} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-display text-accent uppercase tracking-widest mb-1">Direct Comms</div>
                                            <div className="text-xl font-bold text-white">+20{aboutData?.phone}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass p-8 rounded-2xl border-white/10">
                                    <div className="text-xs font-display text-muted-foreground uppercase tracking-[0.3em] mb-6">Connect across the grid</div>
                                    <div className="flex gap-4">
                                        {socialData?.map((item: SocialLink, i: number) => {
                                            const isIconUrl = typeof item.platform_icon === 'string' && (item.platform_icon.startsWith('http') || item.platform_icon.startsWith('/'));
                                            return (
                                                <Link key={i} href={item.url} className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:scale-110" target='_blank'>
                                                    {isIconUrl ? ( <Image src={item.platform_icon} alt={item.platform || 'social icon'} width={24} height={24} className="w-6 h-6 object-contain" /> ) : ( <Mail size={20} /> )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 md:p-10 rounded-2xl border-white/10 relative overflow-hidden" >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Send size={100} className="rotate-12" />
                                </div>
                                {status === 'success' ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 animate-bounce shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                                            <Send size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 uppercase">Packet Transmitted</h3>
                                        <p className="text-muted-foreground font-display">Your message has been successfully beamed to the Nexus server. Expect a response shortly.</p>
                                        <button onClick={() => setStatus('idle')} className="mt-8 text-primary font-display text-sm hover:underline">SEND ANOTHER PACKET?</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto" method='post'>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-display text-primary uppercase tracking-widest ml-1">Identity</label>
                                                <input required name="name" value={form.name} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-display text-white placeholder:text-muted-foreground/30" placeholder="Jane Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-display text-primary uppercase tracking-widest ml-1">Email</label>
                                                <input required name="email" value={form.email} onChange={handleChange} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-display text-white placeholder:text-muted-foreground/30" placeholder="jane@example.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-display text-primary uppercase tracking-widest ml-1">Phone</label>
                                            <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-display text-white placeholder:text-muted-foreground/30" placeholder="+1 (555) 000-0000" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-display text-primary uppercase tracking-widest ml-1">Subject Protocol</label>
                                            <input required name="subject" value={form.subject} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-all font-display text-white placeholder:text-muted-foreground/30" placeholder="Project Inquiry" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-display text-primary uppercase tracking-widest ml-1\">Message Payload</label>
                                            <textarea required name="message" value={form.message} onChange={handleChange} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-primary/50 transition-all font-display text-white placeholder:text-muted-foreground/30 resize-none" placeholder="Enter your transmission here..." />
                                        </div>
                                        <button disabled={status === 'sending'} className="w-full py-4 bg-primary text-background font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(0,255,255,0.2)] disabled:opacity-50">
                                            {status === 'sending' ? ('TRANSMITTING...') : (<>INITIATE TRANSMISSION <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>)}
                                        </button>
                                        {status === 'error' && <p className="text-red-500 text-sm mt-2 font-display">Transmission Failed. Please retry.</p>}
                                    </form>
                                )}
                            </motion.div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
        );
}
