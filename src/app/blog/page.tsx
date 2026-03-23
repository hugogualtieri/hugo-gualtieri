import type { Metadata } from "next";
import Blog from "@/components/Blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles sur le DevOps, le Cloud, l'IA et le business. Retours d'expérience et réflexions par Hugo Gualtieri.",
  openGraph: {
    title: "Blog | Hugo Gualtieri",
    description:
      "Articles sur le DevOps, le Cloud, l'IA et le business. Retours d'expérience et réflexions.",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Blog fullPage />
    </div>
  );
}
