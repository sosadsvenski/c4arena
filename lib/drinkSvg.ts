/**
 * Оригинальные векторные иллюстрации напитков (псевдо-3D).
 * Это не копии упаковки брендов, а банки и бутылки в цвете вкуса.
 * Чтобы показать настоящее фото, укажите `image` у напитка в data/config.ts.
 */
export type DrinkArt = {
  kind: "can" | "bottle" | "carton" | "water";
  /** основной цвет */
  c: string;
  /** тёмный цвет для теней и граней */
  c2: string;
  icon: "bolt" | "apple" | "sun" | "guava" | "bubbles" | "drop";
};

function icon(name: DrinkArt["icon"], x: number, y: number, k = 1): string {
  const wrap = (inner: string) =>
    `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="#fff" stroke-opacity=".92" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  const solid = `fill="#fff" fill-opacity=".92" stroke="none"`;
  const seed = (cx: number, cy: number) =>
    `<circle cx="${cx}" cy="${cy}" r="1.6" fill="#000" fill-opacity=".35" stroke="none"/>`;
  switch (name) {
    case "bolt":
      return wrap(`<path d="M5 -23L-13 4H-2L-6 23L14 -6H3Z" ${solid}/>`);
    case "apple":
      return wrap(
        `<path d="M0 -13C-15 -19 -22 2 -12 14C-8 20 -4 18 0 17C4 18 8 20 12 14C22 2 15 -19 0 -13Z" ${solid}/><path d="M0 -13C0 -19 3 -23 8 -25"/>`,
      );
    case "sun": {
      let rays = "";
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        rays += `<line x1="${(Math.cos(a) * 14).toFixed(1)}" y1="${(Math.sin(a) * 14).toFixed(1)}" x2="${(Math.cos(a) * 21).toFixed(1)}" y2="${(Math.sin(a) * 21).toFixed(1)}"/>`;
      }
      return wrap(`<circle r="9" ${solid}/>${rays}`);
    }
    case "guava":
      return wrap(
        `<circle r="17" ${solid}/><circle r="9" stroke="#000" stroke-opacity=".3" stroke-width="2"/>${seed(-3, -2)}${seed(3, 2)}${seed(2, -4)}`,
      );
    case "bubbles":
      return wrap(`<circle cx="-7" cy="7" r="9"/><circle cx="9" cy="-3" r="6"/><circle cx="-3" cy="-17" r="4"/>`);
    case "drop":
      return wrap(`<path d="M0 -21C11 -6 15 0 15 7A15 15 0 0 1 -15 7C-15 0 -11 -6 0 -21Z" ${solid}/>`);
  }
}

const metal = (id: string) =>
  `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#7f8594"/><stop offset=".35" stop-color="#f4f6fa"/><stop offset=".7" stop-color="#aab0bd"/><stop offset="1" stop-color="#6e7482"/></linearGradient>`;

const shade = (id: string, c: string, c2: string) =>
  `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".22" stop-color="${c}"/><stop offset=".5" stop-color="${c}"/><stop offset=".82" stop-color="${c}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;

const BOTTLE_BODY =
  "M49 22H71V46Q71 58 92 74Q99 82 99 94V196Q99 210 86 210H34Q21 210 21 196V94Q21 82 28 74Q49 58 49 46Z";

function can(a: DrinkArt, id: string): string {
  return (
    `<svg viewBox="0 0 120 220" aria-hidden="true" focusable="false"><defs>${shade(id + "b", a.c, a.c2)}${metal(id + "m")}</defs>` +
    `<path d="M27 44Q27 32 38 30H82Q93 32 93 44V178Q93 190 82 194H38Q27 190 27 178Z" fill="url(#${id}b)"/>` +
    `<path d="M27 110L93 88V120L27 142Z" fill="#000" opacity=".22"/>` +
    `<path d="M27 178Q27 190 38 194H82Q93 190 93 178Z" fill="#000" opacity=".3"/>` +
    `<path d="M36 30Q38 22 46 20H74Q82 22 84 30Z" fill="url(#${id}m)"/>` +
    `<ellipse cx="60" cy="19.5" rx="15" ry="3.5" fill="#eceff5"/><ellipse cx="60" cy="19.5" rx="11" ry="2.3" fill="#7d8391"/><rect x="54" y="17.5" width="12" height="3" rx="1.5" fill="#dfe3ec"/>` +
    icon(a.icon, 60, 115) +
    `<rect x="33" y="40" width="7" height="140" rx="3.5" fill="#fff" opacity=".34"/><rect x="84" y="46" width="3" height="128" rx="1.5" fill="#fff" opacity=".14"/></svg>`
  );
}

function bottle(a: DrinkArt, id: string): string {
  return (
    `<svg viewBox="0 0 120 220" aria-hidden="true" focusable="false"><defs>${shade(id + "b", a.c, a.c2)}</defs>` +
    `<rect x="49" y="4" width="22" height="14" rx="3" fill="#e8eaf0"/><path d="M54 6V16M60 6V16M66 6V16" stroke="#000" stroke-opacity=".15"/>` +
    `<rect x="47" y="18" width="26" height="4" rx="2" fill="#fff" opacity=".7"/>` +
    `<path d="${BOTTLE_BODY}" fill="url(#${id}b)"/>` +
    `<rect x="21" y="112" width="78" height="58" fill="#000" opacity=".3"/><rect x="21" y="112" width="78" height="2" fill="#fff" opacity=".35"/><rect x="21" y="168" width="78" height="2" fill="#fff" opacity=".35"/>` +
    icon(a.icon, 60, 141) +
    `<rect x="28" y="84" width="7" height="118" rx="3.5" fill="#fff" opacity=".3"/><path d="M54 30V52" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/></svg>`
  );
}

function carton(a: DrinkArt, id: string): string {
  const topFront = `<polygon points="24,62 54,30 84,62" fill="${a.c}"/><polygon points="24,62 54,30 84,62" fill="#fff" opacity=".22"/>`;
  const topSide = `<polygon points="54,30 70,22 100,52 84,62" fill="${a.c2}"/><polygon points="54,30 70,22 100,52 84,62" fill="#fff" opacity=".08"/>`;
  return (
    `<svg viewBox="0 0 120 220" aria-hidden="true" focusable="false"><defs>${shade(id + "b", a.c, a.c2)}</defs>` +
    `<rect x="24" y="62" width="60" height="146" rx="3" fill="url(#${id}b)"/>` +
    `<polygon points="84,62 100,52 100,198 84,208" fill="${a.c2}"/>` +
    topFront + topSide +
    `<rect x="49" y="24" width="12" height="8" rx="2" fill="#eceff5"/><rect x="47" y="30" width="16" height="3" rx="1.5" fill="#c8ccd6"/>` +
    `<rect x="24" y="166" width="60" height="16" fill="#000" opacity=".2"/>` +
    icon(a.icon, 54, 120) +
    `<rect x="29" y="70" width="5" height="132" rx="2.5" fill="#fff" opacity=".3"/></svg>`
  );
}

function waterBottle(a: DrinkArt, id: string, tx: number, fizzy: boolean): string {
  const bubbles = fizzy
    ? `<g fill="#fff" opacity=".75"><circle cx="45" cy="172" r="3"/><circle cx="62" cy="150" r="2"/><circle cx="76" cy="178" r="2.6"/><circle cx="55" cy="192" r="2"/><circle cx="82" cy="140" r="1.8"/><circle cx="40" cy="146" r="1.8"/></g>`
    : icon(a.icon, 60, 156, 0.85);
  return (
    `<g transform="translate(${tx} 18) scale(.82)">` +
    `<rect x="48" y="4" width="24" height="14" rx="3" fill="${a.c}"/><path d="M53 6V16M60 6V16M67 6V16" stroke="#000" stroke-opacity=".15"/>` +
    `<rect x="46" y="18" width="28" height="4" rx="2" fill="#fff" opacity=".7"/>` +
    `<path d="${BOTTLE_BODY}" fill="url(#${id})" stroke="#d6f1ff" stroke-opacity=".65" stroke-width="2"/>` +
    `<path d="M22 118Q41 108 60 118T98 118V196Q98 210 86 210H34Q22 210 22 196Z" fill="${a.c}" opacity=".35"/>` +
    bubbles +
    `<rect x="28" y="84" width="7" height="118" rx="3.5" fill="#fff" opacity=".3"/></g>`
  );
}

function water(a: DrinkArt, id: string): string {
  return (
    `<svg viewBox="0 0 150 220" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}w" x1="0" x2="1"><stop offset="0" stop-color="${a.c}" stop-opacity=".3"/><stop offset=".3" stop-color="${a.c}" stop-opacity=".7"/><stop offset=".6" stop-color="${a.c}" stop-opacity=".45"/><stop offset="1" stop-color="${a.c}" stop-opacity=".3"/></linearGradient></defs>` +
    waterBottle(a, id + "w", 2, false) +
    waterBottle(a, id + "w", 68, true) +
    `</svg>`
  );
}

/** Возвращает SVG-разметку. `i` нужен для уникальных id градиентов на странице. */
export function drinkSvg(a: DrinkArt, i: number): string {
  const id = `dk${i}`;
  switch (a.kind) {
    case "can":
      return can(a, id);
    case "bottle":
      return bottle(a, id);
    case "carton":
      return carton(a, id);
    case "water":
      return water(a, id);
  }
}
