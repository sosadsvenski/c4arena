import { siteConfig, tariffs, zones } from "@/data/config";
import CtaIcon from "./CtaIcon";

/** Баннер с призывом к брони сразу после тарифов — момент, когда человек уже выбрал цену */
export default function CtaBand() {
  const totalPcs = zones.reduce((sum, z) => sum + z.pcCount, 0);
  const minPrice = Math.min(...tariffs.map((t) => t.weekday));
  const trio = zones.find((z) => z.id === "trio");

  return (
    <section className="cta-band relative py-10" aria-labelledby="cta-title">
      <div className="mx-auto max-w-6xl px-4">
        <div className="cb">
          <h2 id="cta-title">
            Выбери ПК и <em>займи место в игре</em>
          </h2>
          <p>Напишите администратору в Telegram — подберём ПК и время. Быстро и без регистрации.</p>
          <ul className="chips">
            <li>{totalPcs} игровых ПК</li>
            <li>от {minPrice} ₽ / час</li>
            {trio && (
              <li>
                {trio.name} · {trio.gpu}
              </li>
            )}
          </ul>
          <a className="cta-big" href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer">
            <CtaIcon />
            {siteConfig.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
