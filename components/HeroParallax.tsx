"use client";

import { useEffect } from "react";

/**
 * Лёгкий параллакс сцены с логотипом: слои смещаются за курсором.
 * Работает только там, где есть мышь, и если пользователь не просил «меньше анимации».
 * Ничего не рендерит — просто двигает CSS-переменные --px/--py у #stage.
 */
export default function HeroParallax() {
  useEffect(() => {
    const stage = document.getElementById("stage");
    if (!stage) return;

    // Пока hero не виден, ставим анимации на паузу — экономим батарею на телефонах
    const hero = stage.closest(".hero");
    const io = hero
      ? new IntersectionObserver(([entry]) => hero.classList.toggle("off", !entry.isIntersecting), { rootMargin: "80px" })
      : null;
    if (hero && io) io.observe(hero);

    const mq = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return () => io?.disconnect();

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      stage.style.setProperty("--px", cx.toFixed(3));
      stage.style.setProperty("--py", cy.toFixed(3));
      raf = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
