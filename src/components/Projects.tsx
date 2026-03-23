import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "CloudDeploy Pro",
    desc: "Outil de déploiement automatisé multi-cloud avec Terraform et GitHub Actions.",
    tags: ["Terraform", "AWS", "CI/CD"],
    status: "En production",
    url: "#",
  },
  {
    title: "AI Content Pipeline",
    desc: "Pipeline de génération de contenu SEO automatisé utilisant des LLMs et du RAG.",
    tags: ["Python", "LLM", "RAG"],
    status: "Beta",
    url: "#",
  },
  {
    title: "SaaS Monitoring Hub",
    desc: "Dashboard de monitoring centralisé pour mes side-projects avec alertes en temps réel.",
    tags: ["React", "Grafana", "Prometheus"],
    status: "En développement",
    url: "#",
  },
  {
    title: "Affiliate Tracker",
    desc: "Suivi des revenus d'affiliation multi-plateformes avec analytics intégrés.",
    tags: ["Node.js", "Stripe", "Analytics"],
    status: "En production",
    url: "#",
  },
  {
    title: "K8s Cost Optimizer",
    desc: "Outil d'optimisation des coûts Kubernetes basé sur l'analyse de l'usage réel.",
    tags: ["Kubernetes", "Go", "FinOps"],
    status: "Side-project",
    url: "#",
  },
  {
    title: "Newsletter Autopilot",
    desc: "Automatisation d'envoi de newsletters avec segmentation IA des lecteurs.",
    tags: ["IA", "Email", "Automation"],
    status: "Beta",
    url: "#",
  },
];

const statusColor: Record<string, string> = {
  "En production": "bg-primary/10 text-primary",
  Beta: "bg-revenue-affiliate/10 text-revenue-affiliate",
  "En développement": "bg-revenue-stripe/10 text-revenue-stripe",
  "Side-project": "bg-muted text-muted-foreground",
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 section-padding bg-card">
      <div className="container">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Projets
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que je construis
          </h2>
          <p className="text-muted-foreground max-w-xl mb-12">
            Des outils, des SaaS, des side-projects — chaque idée est une expérience d&apos;apprentissage et de monétisation.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 70}>
              <a
                href={project.url}
                className="group block p-6 rounded-xl bg-surface-elevated border hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[project.status] || "bg-muted text-muted-foreground"}`}
                  >
                    {project.status}
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
