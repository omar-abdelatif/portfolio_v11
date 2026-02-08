(function() {
    console.log("%c NEXUS_OS SYSTEM INITIALIZED ", "background: #00ffff; color: #000; font-weight: bold; padding: 4px;");
    document.addEventListener('DOMContentLoaded', () => {
        const uptime = performance.now();
        console.log(`[SYSTEM] Uptime: ${Math.round(uptime)}ms`);
    });
})();
