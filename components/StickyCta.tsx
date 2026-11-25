"use client";

import { useEffect, useState } from "react";
import { siteConfig, tariffs, zones } from "@/data/config";
import CtaIcon from "./CtaIcon";

/**
 * Липкая панель брони на телефоне. Показывается сразу, а прячется только когда
 * на экране уже есть основная кнопка (в hero или в баннере после тарифов) — чтобы не дублировать.
 */
export default function StickyCta() {
  const [show, setShow] = useState(true);
  const totalPcs = zones.reduce((sum, z) => sum + z.pcCount, 0);
  const minPrice = Math.min(...tariffs.map((t) => t.weekday));

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(".hx-cta, .cta-band .cta-big"));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setShow(visible.size === 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`sticky-cta${show ? " show" : ""}`} aria-hidden={!show}>
      <div className="st">
        <b>Займи свой ПК</b>
        <span>
          {totalPcs} мест · от {minPrice} ₽/час
        </span>
      </div>
      <a className="cta-big" href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" tabIndex={show ? 0 : -1}>
        <CtaIcon />
        Забронировать
      </a>
    </div>
  );
}
