import Link from "next/link";
import { Github, Linkedin, Calendar } from "lucide-react";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-16 section-padding border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" className="text-lg font-semibold mb-2 inline-block">
              Hugo Gualtieri<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Ingénieur freelance spécialisé DevOps, Cloud & IA.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://cal.com/hugogualtieri/30min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-200"
            >
              <Calendar size={16} />
              Prendre RDV
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-95 transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-95 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-95 transition-all"
              aria-label="X"
            >
              <XIcon size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hugo Gualtieri. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
