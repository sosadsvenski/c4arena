import Image from "next/image";
import { siteConfig, zones } from "@/data/config";

const accentStyles = {
  cyan: {
    badge: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40",
    glow: "bg-neon-cyan/25",
    text: "text-neon-cyan",
    seg: "bg-neon-cyan shadow-[0_0_10px_#22e6ff]",
    card: "",
    tag: "border border-white/10 bg-white/[0.06] text-white/60",
  },
  pink: {
    badge: "bg-neon-pink/15 text-neon-pink border-neon-pink/40",
    glow: "bg-neon-pink/25",
    text: "text-neon-pink",
    seg: "bg-neon-pink shadow-[0_0_12px_#ff2bd6]",
    // Трио-зона — топовая: розовая рамка и свечение карточки
    card: "ring-1 ring-neon-pink/50 shadow-[0_0_60px_rgba(255,43,214,0.22)]",
    tag: "bg-gradient-to-r from-neon-pink to-neon-violet text-white shadow-[0_0_24px_rgba(255,43,214,0.5)]",
  },
} as const;

export default function Zones() {
  return (
    <section id="hardware" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">
          Игровые зоны и железо <span className="text-neon-pink">/</span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {zones.map((z) => {
            const a = accentStyles[z.accent];
            return (
              <article key={z.id} className={`glass flex flex-col ${a.card}`}>
                {/* Превью зоны */}
                <div className="relative h-48 w-full sm:h-56">
                  <Image
                    src={z.image}
                    alt={z.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className={`absolute -bottom-10 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full blur-3xl ${a.glow} ${z.level >= 10 ? "animate-pulse" : ""}`} />
                  <span
                    className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${a.badge}`}
                  >
                    {z.pcCount} ПК · №{z.seats}
                  </span>
                </div>

                <div className="relative p-5">
                  <span
                    className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest ${a.tag}`}
                  >
                    {z.level >= 10 && <span aria-hidden>⚡</span>}
                    {z.tag}
                  </span>
                  <h3 className="font-display text-xl font-extrabold uppercase">{z.name}</h3>
                  <dl className="mt-4 divide-y divide-white/10 text-sm">
                    <Spec label="Процессор" value={z.cpu} />
                    <Spec label="Видеокарта" value={z.gpu} />
                    <Spec label="ОЗУ" value={z.ram} />
                  </dl>

                  {/* Шкала мощности */}
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-baseline justify-between gap-3 text-[11px] uppercase tracking-widest text-white/50">
                      <span>Уровень мощности</span>
                      <b className={`font-display text-sm font-extrabold ${a.text}`}>{z.levelLabel}</b>
                    </div>
                    <div className="mt-2.5 grid grid-cols-10 gap-1" role="img" aria-label={`${z.levelLabel}: ${z.level} из 10`}>
                      {Array.from({ length: 10 }, (_, i) => (
                        <i
                          key={i}
                          className={`h-3.5 -skew-x-[18deg] rounded-[3px] ${i < z.level ? a.seg : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <a
                    href={siteConfig.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon mt-5 w-full"
                  >
                    {siteConfig.ctaText}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Сводная таблица (горизонтальный скролл на мобильных) */}
        <div className="glass mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-white/50">
              <tr>
                <th className="px-5 py-3 font-semibold">Зона</th>
                <th className="px-5 py-3 font-semibold">Кол-во ПК</th>
                <th className="px-5 py-3 font-semibold">Процессор</th>
                <th className="px-5 py-3 font-semibold">Видеокарта</th>
                <th className="px-5 py-3 font-semibold">ОЗУ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {zones.map((z) => (
                <tr key={z.id}>
                  <td className="px-5 py-3 font-semibold">{z.name}</td>
                  <td className="px-5 py-3">{z.pcCount}</td>
                  <td className="px-5 py-3">{z.cpu}</td>
                  <td className="px-5 py-3">{z.gpu}</td>
                  <td className="px-5 py-3">{z.ram}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
