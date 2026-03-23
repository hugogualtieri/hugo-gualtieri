"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { articles, categoryColor } from "@/data/articles";

const categories = ["Tous", "Cloud", "Formation"];

interface BlogProps {
  fullPage?: boolean;
}

const Blog = ({ fullPage = false }: BlogProps) => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = activeCategory === "Tous"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const Wrapper = fullPage ? "main" : "section";

  return (
    <Wrapper id="blog" className={fullPage ? "pt-24 pb-16 section-padding min-h-screen" : "py-24 md:py-32 section-padding"}>
      <div className="container">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Blog
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Réflexions & retours d&apos;expérience
          </h2>
          <p className="text-muted-foreground max-w-xl mb-8">
            Je partage ce que j&apos;apprends — tech, business, argent. Sans filtre.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors active:scale-[0.97] ${
                  cat === activeCategory
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-1">
          {filtered.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 70}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 px-4 -mx-4 rounded-xl hover:bg-card transition-colors duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${categoryColor[article.category] || "text-muted-foreground"}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <span>{article.readTime}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {!fullPage && (
          <ScrollReveal delay={300}>
            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Voir tous les articles <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </Wrapper>
  );
};

export default Blog;
