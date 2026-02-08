import "@/styles/globals.css";
import "../../public/assets/css/style.css";
import type { AppProps } from "next/app";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import Head from "next/head";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
        <Head>
            <title>Omar Abdelatif | System Initialized</title>
            <meta name="description" content="Omar Abdelatif | System Initialized" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col`}>
             <div className="scanline" />
             <Navbar />
             <main className="relative z-10 pt-16 flex-grow">
                <Component {...pageProps} />
             </main>
             <Footer />
             <Script src="/assets/js/main.js" strategy="afterInteractive" />
        </div>
    </QueryProvider>
  );
}
