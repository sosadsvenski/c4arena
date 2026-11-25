import { siteConfig, socials } from "@/data/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 pb-24 md:pb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-white/40 sm:flex-row">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-neon-cyan"
            >
              {s.name}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
