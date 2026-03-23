import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center section-padding">
      <div className="text-center">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Page introuvable
        </h1>
        <p className="text-muted-foreground mb-8">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-200"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
