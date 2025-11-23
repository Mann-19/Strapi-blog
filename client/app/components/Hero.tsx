'use client';

import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById("content");
    contentSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Subtle texture overlay - Data URI is fine in Next.js */}
      <div className="absolute inset-0 opacity-[0.04]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} 
      />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline */}
          <div className="mb-8">
            <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium">
              VyomGarud
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-foreground">
            Blog Website
            <span className="block mt-2 text-accent italic">w. Strapi CMS</span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Thoughtful essays on culture, technology, and the human experience. 
            Updated weekly with perspectives that challenge convention.
          </p>

          {/* Scroll indicator */}
          <button 
            onClick={scrollToContent}
            className="group inline-flex flex-col items-center gap-3 transition-smooth hover:text-accent cursor-pointer"
            aria-label="Scroll to content"
          >
            <span className="text-sm uppercase tracking-wider font-medium text-foreground group-hover:text-accent">Explore</span>
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:border-accent transition-smooth text-foreground group-hover:text-accent">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;