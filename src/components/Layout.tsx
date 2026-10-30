import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  noFooter?: boolean;
}

export default function Layout({ children, noFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
}

export { Layout };

