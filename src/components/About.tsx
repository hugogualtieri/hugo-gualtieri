import { Cloud, Cpu, Terminal, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const skills = [
  { icon: Cloud, label: "Cloud", desc: "AWS, GCP, Azure — architectures scalables et résilientes" },
  { icon: Terminal, label: "DevOps", desc: "CI/CD, Terraform, Kubernetes, Docker, GitOps" },
  { icon: Cpu, label: "IA / ML", desc: "LLMs, RAG, agents, fine-tuning, MLOps" },
  { icon: TrendingUp, label: "Business", desc: "Monétisation, side-projects, stratégies de revenus" },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 section-padding">
      <div className="container">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            À propos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ingénieur passionné, entrepreneur dans l&apos;âme
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-16">
            Après plusieurs années à construire des infrastructures cloud pour des startups et des grands comptes,
            je me suis lancé en freelance pour explorer librement les sujets qui me passionnent : l&apos;automatisation,
            l&apos;IA et la création de projets rentables. Ce site est mon journal de bord.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.label} delay={i * 80}>
              <div className="group p-6 rounded-xl bg-surface-elevated border hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <skill.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{skill.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
