import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles, categoryColor } from "@/data/articles";
import ScrollReveal from "@/components/ScrollReveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: ["Hugo Gualtieri"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      return <h3 key={i} className="text-xl font-semibold mt-8 mb-3">{trimmed.slice(4)}</h3>;
    }
    if (trimmed.startsWith("## ")) {
      return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith("- **")) {
      const match = trimmed.match(/^- \*\*(.+?)\*\*\s*[:：]\s*(.+)$/);
      if (match) {
        return (
          <li key={i} className="ml-4 mb-2 text-muted-foreground leading-relaxed list-disc">
            <strong className="text-foreground">{match[1]}</strong> : {match[2]}
          </li>
        );
      }
      const simpleMatch = trimmed.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (simpleMatch) {
        return (
          <li key={i} className="ml-4 mb-2 text-muted-foreground leading-relaxed list-disc">
            <strong className="text-foreground">{simpleMatch[1]}</strong>{simpleMatch[2]}
          </li>
        );
      }
    }
    if (trimmed.startsWith("- ")) {
      return (
        <li key={i} className="ml-4 mb-2 text-muted-foreground leading-relaxed list-disc">
          {trimmed.slice(2)}
        </li>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <li key={i} className="ml-4 mb-2 text-muted-foreground leading-relaxed list-decimal">
          {trimmed.replace(/^\d+\.\s/, "")}
        </li>
      );
    }
    if (trimmed.startsWith("|")) {
      if (trimmed.match(/^\|[-|]+\|$/)) return null;
      const cells = trimmed.split("|").filter(Boolean).map((c) => c.trim());
      return (
        <div key={i} className="grid grid-cols-2 gap-4 py-2 border-b text-sm">
          <span className="font-medium">{cells[0]}</span>
          <span className="text-muted-foreground tabular-nums">{cells[1]}</span>
        </div>
      );
    }
    if (trimmed === "") return <div key={i} className="h-2" />;

    const parts = trimmed.split(/(\*\*.+?\*\*)/g);
    return (
      <p key={i} className="text-muted-foreground leading-relaxed mb-3">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="pt-24 pb-16 section-padding min-h-screen">
      <div className="container max-w-3xl">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Retour au blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold uppercase tracking-wide ${categoryColor[article.category] || "text-muted-foreground"}`}>
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">{article.date}</span>
            <span className="text-xs text-muted-foreground">&middot; {article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-10 border-b pb-10">
            {article.excerpt}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <article className="prose-content">
            {renderContent(article.content)}
          </article>
        </ScrollReveal>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.excerpt,
              author: {
                "@type": "Person",
                name: "Hugo Gualtieri",
                url: "https://hugo-gualtieri.com",
              },
              datePublished: article.date,
              url: `https://hugo-gualtieri.com/blog/${article.slug}`,
            }),
          }}
        />
      </div>
    </main>
  );
}
