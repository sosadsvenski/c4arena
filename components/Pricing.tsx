import HallMap from "./HallMap";
import { siteConfig, tariffs, tariffsConfig as t } from "@/data/config";

const fmt = (n: number) => `${n} ${t.currency}`;

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title">
            {t.title} и схема зала <span className="text-neon-cyan">/</span>
          </h2>
          <span className="w-fit rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
            {t.hallBadge}
          </span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Схема зала */}
          <div className="glass p-4 sm:p-5">
            <h3 className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Схема зала
            </h3>
            <HallMap />
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm border border-neon-cyan" /> Общие залы, ПК 1–17
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm border border-neon-pink" /> Трио зона, ПК 18–20
              </li>
            </ul>
          </div>

          {/* Тарифы */}
          <div className="glass p-4 sm:p-5">
            <h3 className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Тарифы
            </h3>

            {/* Горизонтальный скролл на узких экранах */}
            <div className="-mx-1 overflow-x-auto px-1">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="text-[11px] uppercase tracking-wider text-white/55">
                  <tr>
                    <th className="px-3 py-3 font-semibold">Тариф</th>
                    <th className="px-3 py-3 text-center font-semibold">
                      {t.weekdayLabel}
                      <span className="block text-[10px] normal-case text-white/40">
                        ({t.weekdaySub})
                      </span>
                    </th>
                    <th className="px-3 py-3 text-center font-semibold">
                      {t.weekendLabel}
                      <span className="block text-[10px] normal-case text-white/40">
                        ({t.weekendSub})
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tariffs.map((row) => (
                    <tr key={row.name} className="transition hover:bg-white/[0.04]">
                      <td className="px-3 py-3.5">
                        <span className="font-semibold">{row.name}</span>
                        {row.note && (
                          <span className="block text-xs text-white/45">{row.note}</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-center font-bold text-neon-cyan">
                        {fmt(row.weekday)}
                      </td>
                      <td className="px-3 py-3.5 text-center font-bold text-neon-pink">
                        {fmt(row.weekend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </div>

        <p className="mt-5 text-center text-xs text-white/40">{t.disclaimer}</p>
      </div>
    </section>
  );
}
