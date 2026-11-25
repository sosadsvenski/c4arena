import { siteConfig, socials } from "@/data/config";

export default function Contacts() {
  const items = [
    siteConfig.address ? { label: "Адрес", value: siteConfig.address } : null,
    siteConfig.workingHours ? { label: "Режим работы", value: siteConfig.workingHours } : null,
    siteConfig.phone
      ? { label: "Телефон", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` }
      : null,
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <section id="contacts" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon-violet/30 blur-[100px]" />
          <h2 className="section-title relative">
            Контакты <span className="text-neon-pink">/</span>
          </h2>
          <p className="relative mt-3 max-w-xl text-white/70">
            Напишите администратору в Telegram — забронируем ПК на удобное время.
          </p>

          <div className="relative mt-8 grid gap-3 sm:max-w-2xl sm:grid-cols-2">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 ${
                  s.accent === "violet" ? "hover:border-neon-violet" : "hover:border-neon-cyan"
                }`}
              >
                <span
                  className={`grid h-11 w-11 flex-none place-items-center rounded-xl ${
                    s.accent === "violet"
                      ? "bg-neon-violet/15 text-neon-violet"
                      : "bg-neon-cyan/15 text-neon-cyan"
                  }`}
                >
                  <SocialIcon id={s.id} />
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block font-semibold">{s.title}</b>
                  <small className="block truncate text-xs text-white/50">{s.handle}</small>
                </span>
                <span aria-hidden className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </a>
            ))}
          </div>

          <dl className="relative mt-4 grid gap-4 sm:max-w-2xl">
            {items.map((it) => (
              <div key={it.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-xs uppercase tracking-wider text-white/45">{it.label}</dt>
                <dd className="mt-1 text-lg font-semibold">
                  {it.href ? (
                    <a
                      href={it.href}
                      target={it.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="hover:text-neon-cyan"
                    >
                      {it.value}
                    </a>
                  ) : (
                    it.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon relative mt-8 w-full sm:w-auto"
          >
            {siteConfig.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Нейтральные иконки (не логотипы сервисов): рупор для канала, гарнитура для голосового сервера */
function SocialIcon({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {id === "discord" ? (
        <>
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="3" y="14" width="4" height="6" rx="1.5" />
          <rect x="17" y="14" width="4" height="6" rx="1.5" />
        </>
      ) : (
        <>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
          <path d="M15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
        </>
      )}
    </svg>
  );
}
