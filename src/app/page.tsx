import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import RevenueDashboard from "@/components/RevenueDashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Blog />
      <RevenueDashboard />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Hugo Gualtieri",
            url: "https://hugo-gualtieri.com",
            jobTitle: "Ingénieur Freelance DevOps, Cloud & IA",
            description:
              "Ingénieur freelance spécialisé DevOps, Cloud et IA. Projets, blog et revenus en toute transparence.",
            knowsAbout: [
              "DevOps",
              "Cloud Computing",
              "AWS",
              "GCP",
              "Terraform",
              "Kubernetes",
              "Artificial Intelligence",
              "Machine Learning",
            ],
            sameAs: [],
          }),
        }}
      />
    </div>
  );
}
