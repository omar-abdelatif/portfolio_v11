export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 glass text-center font-display text-sm text-muted-foreground mt-20">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} NEXUS_OS SYSTEM. ALL RIGHTS RESERVED.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
