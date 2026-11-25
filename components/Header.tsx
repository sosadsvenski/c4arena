"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data/config";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Логотип */}
        <a href="#top" className="flex items-center gap-3" aria-label={siteConfig.name}>
          <Image
            src="/images/logo.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-display text-sm font-extrabold uppercase tracking-wide">
            {siteConfig.shortName} <span className="text-neon-cyan">КИБЕР АРЕНА</span>
          </span>
        </a>

        {/* Навигация (desktop) */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-sm font-medium text-white/70 transition hover:text-neon-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon hidden !px-4 !py-2 sm:inline-flex"
          >
            {siteConfig.headerCtaText}
          </a>

          {/* Бургер (mobile) */}
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 md:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <nav
          className="border-t border-white/10 bg-ink/95 px-4 pb-5 pt-3 backdrop-blur-xl md:hidden"
          aria-label="Мобильная навигация"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-neon-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon mt-3 w-full"
          >
            {siteConfig.headerCtaText}
          </a>
        </nav>
      )}
    </header>
  );
}
