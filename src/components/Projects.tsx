import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Ma Municipalité",
    desc: "Logiciel de mairie pour la gestion des salles municipales et du matériel communal. Réservation en ligne, paiements, planning.",
    tags: ["Next.js", "TypeScript", "AWS", "Stripe"],
    status: "En production",
    url: "https://ma-municipalite.fr",
  },
  {
    title: "OpenRando",
    desc: "Application web de randonnée : import GPX, guidage GPS en temps réel, historique de sorties et partage communautaire de tracés.",
    tags: ["Next.js", "TypeScript", "AWS", "GPX"],
    status: "En production",
    url: "https://openrando.com",
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

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 70}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
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
