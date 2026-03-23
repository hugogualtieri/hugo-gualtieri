"use client";

import { ArrowDown, Calendar } from "lucide-react";
import { useState } from "react";
import NodeGraph from "./NodeGraph";
import AnimatedTerminal from "./AnimatedTerminal";
import InfraGraph from "./InfraGraph";

const VARIANTS = [
  { id: "nodes", label: "Réseau", component: NodeGraph },
  { id: "terminal", label: "Terminal", component: AnimatedTerminal },
  { id: "infra", label: "Infra", component: InfraGraph },
] as const;

const Hero = () => {
  const [activeVariant, setActiveVariant] = useState(0);
  const ActiveComponent = VARIANTS[activeVariant].component;

  return (
    <section className="min-h-[85vh] flex flex-col justify-center pt-16 section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-6 opacity-0 animate-fade-up">
            <p className="text-sm font-medium text-primary tracking-wide uppercase">
              Ingénieur Freelance
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08]">
              Hugo Gualtieri
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              DevOps · Cloud · IA — Je construis des infrastructures solides
              et j&apos;explore les frontières de l&apos;intelligence artificielle.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-200"
              >
                Voir mes projets
              </a>
              <a
                href="https://cal.com/hugogualtieri/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium text-foreground hover:bg-secondary active:scale-[0.97] transition-all duration-200"
              >
                <Calendar size={16} />
                Prendre RDV
              </a>
            </div>
          </div>

          <div className="hidden lg:block opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="flex items-center gap-1 mb-3 justify-end">
                {VARIANTS.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(i)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 active:scale-95 ${
                      i === activeVariant
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <div className="aspect-square max-w-md ml-auto overflow-hidden">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="mt-16 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <ArrowDown size={14} className="animate-bounce" />
          Défiler
        </a>
      </div>
    </section>
  );
};

export default Hero;
