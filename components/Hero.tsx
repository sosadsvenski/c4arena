import type { CSSProperties } from "react";
import { siteConfig, tariffs, zones } from "@/data/config";
import HeroParallax from "./HeroParallax";
import CtaIcon from "./CtaIcon";

/** Детерминированные «искры» (без Math.random — чтобы не было рассинхрона при гидратации) */
const SPARK_COLORS = ["#22e6ff", "#ff2bd6", "#8b5cf6"];
const sparks = Array.from(
  { length: 24 },
  (_, i) =>
    ({
      "--x": `${(i * 37 + 11) % 100}%`,
      "--s": `${2 + (i % 3)}px`,
      "--c": SPARK_COLORS[i % 3],
      "--d": `${9 + ((i * 7) % 9)}s`,
      "--dl": `${-((i * 13) % 14)}s`,
      "--dx": `${((i * 29) % 80) - 40}px`,
    }) as CSSProperties,
);

export default function Hero() {
  const totalPcs = zones.reduce((sum, z) => sum + z.pcCount, 0);
  const minPrice = Math.min(...tariffs.map((t) => t.weekday));

  // Последние два слова слогана подсвечиваем неоновым градиентом
  const words = siteConfig.tagline.split(" ");
  const head = words.slice(0, -2).join(" ");
  const accent = words.slice(-2).join(" ");

  return (
    <section id="top" className="hero pt-16">
      {/* ФОН: фото зала, дрейфующие неоновые пятна, пол-сетка, искры */}
      <div className="hbg" aria-hidden="true">
        <div className="photo-bg" style={{ "--photo": "url(/images/hall-2.jpg)" } as CSSProperties} />
        <div className="shade" />
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <div className="floor" />
        <div className="scanlines" />
        <div className="sparks">
          {sparks.map((style, i) => (
            <i key={i} style={style} />
          ))}
        </div>
      </div>

      <div className="hgrid mx-auto max-w-6xl px-4 pb-14 pt-6 sm:pb-20 sm:pt-10">
        <div className="hcopy">
          <h1 className="sr">{siteConfig.name}</h1>
          <p className="tag">
            {head} <em>{accent}</em>
          </p>
          <p className="lead">{siteConfig.description}</p>
          <div className="hx-cta">
            <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className="cta-big">
              <CtaIcon />
              {siteConfig.ctaText}
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-neon-cyan hover:text-neon-cyan"
            >
              Смотреть тарифы
            </a>
          </div>
          <p className="cta-note">
            Бронь в <b>Telegram</b> — быстро и без регистрации
          </p>
          <div className="hx-stats">
            <div className="hx-stat">
              <b>{totalPcs}</b>
              <span>игровых ПК</span>
            </div>
            <div className="hx-stat">
              <b>{zones.length}</b>
              <span>зоны: залы и трио</span>
            </div>
            <div className="hx-stat">
              <b>от {minPrice} ₽</b>
              <span>за час игры</span>
            </div>
          </div>
        </div>

        {/* СЦЕНА: бомба сзади, текст логотипа поверх неё */}
        <div className="stagebox">
          <div className="stage" id="stage" aria-hidden="true">
            <div className="halo" />
            <div className="rings">
              <div className="ring r3" />
              <div className="ring" />
              <div className="ring r2" />
            </div>

            <div className="layer l-bomb">
              <div className="in in-bomb">
                <div className="fl-a">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-bomb.webp" alt="" width={720} height={838} fetchPriority="high" decoding="async" />
                  <span className="scan" style={{ "--m": "url(/images/logo-bomb-mask.png)" } as CSSProperties} />
                  <span className="led" />
                </div>
              </div>
            </div>

            <div className="layer l-c4">
              <div className="in in-c4">
                <div className="fl-b">
                  <div className="txt">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-c4.png" alt="" width={760} height={363} />
                    <span className="sh" style={{ "--m": "url(/images/logo-c4.png)" } as CSSProperties} />
                  </div>
                </div>
              </div>
            </div>

            <div className="layer l-name">
              <div className="in in-name">
                <div className="fl-c">
                  <div className="txt t2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-name.png" alt="" width={1400} height={124} />
                    <span className="sh" style={{ "--m": "url(/images/logo-name.png)" } as CSSProperties} />
                  </div>
                </div>
              </div>
            </div>

            <div className="layer l-chip a">
              <div className="in">
                <div className="fl-b">
                  <span className="hchip">
                    <i />
                    Общие залы · ПК {zones[0].seats}
                  </span>
                </div>
              </div>
            </div>
            <div className="layer l-chip b">
              <div className="in">
                <div className="fl-b">
                  <span className="hchip">
                    <i />
                    {zones[1].name} · ПК {zones[1].seats}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroParallax />
    </section>
  );
}
