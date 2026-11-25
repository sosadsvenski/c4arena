"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { hallMap, siteConfig, tariffs, zones } from "@/data/config";

/**
 * Интерактивная схема зала: наведите (компьютер) или нажмите (телефон) на место —
 * под схемой покажется карточка с характеристиками этого ПК и кнопкой брони.
 */
export default function HallMap() {
  const { width, height, seatW, seatH, seats, desk, topBox, dividers, trioSeats } = hallMap;

  // По умолчанию показываем первое место трио-зоны — чтобы карточка сразу была заполнена
  const [pinned, setPinned] = useState<number | null>(trioSeats[0] ?? seats[0]?.n ?? null);
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? pinned;

  const minPrice = Math.min(...tariffs.map((t) => t.weekday));
  const isTrio = (n: number) => trioSeats.includes(n);
  const zoneOf = (n: number) => zones.find((z) => z.id === (isTrio(n) ? "trio" : "halls")) ?? zones[0];

  const toggle = (n: number) => setPinned((cur) => (cur === n ? null : n));
  const onKey = (e: KeyboardEvent, n: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(n);
    }
  };

  const zone = active !== null ? zoneOf(active) : null;

  return (
    <div>
      <p className="mapcap">Нажмите на место — покажем характеристики ПК</p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="group"
        aria-label="Схема клуба: 20 игровых мест. Выберите место, чтобы увидеть характеристики"
        className="h-auto w-full"
      >
        <defs>
          <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </pattern>
          <filter id="seatGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={width} height={height} rx="8" fill="#0a0b0f" />
        <rect width={width} height={height} rx="8" fill="url(#grid)" />

        {/* Область верхних ПК */}
        <rect
          x={topBox.x}
          y={topBox.y}
          width={topBox.w}
          height={topBox.h}
          fill="none"
          stroke="rgba(255,43,214,0.6)"
          strokeWidth="1.5"
        />

        {/* Перегородки */}
        {dividers.map((d, i) => (
          <line key={i} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        ))}

        {/* Стойка администратора */}
        <g>
          <rect
            x={desk.x}
            y={desk.y}
            width={desk.w}
            height={desk.h}
            rx="5"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.3)"
          />
          <circle cx={desk.x + 12} cy={desk.y + 13} r="3.5" fill="#fff" />
          <path d={`M ${desk.x + 6} ${desk.y + 26} q 6 -8 12 0 z`} fill="#fff" />
          <text x={desk.x + 24} y={desk.y + 16} fontSize="7" fontWeight="700" fill="#fff">
            {desk.label}
          </text>
          <text x={desk.x + 24} y={desk.y + 25} fontSize="5.5" fill="rgba(255,255,255,0.55)">
            {desk.sub}
          </text>
        </g>

        {/* Игровые места (кликабельные) */}
        {seats.map((s) => {
          const trio = isTrio(s.n);
          const color = trio ? "#ff2bd6" : "#22e6ff";
          const cls = ["seat", pinned === s.n ? "sel" : "", hover === s.n ? "hv" : ""].join(" ").trim();
          return (
            <g
              key={s.n}
              className={cls}
              role="button"
              tabIndex={0}
              aria-pressed={pinned === s.n}
              aria-label={`ПК ${s.n}, ${trio ? "трио зона" : "общий зал"}. Показать характеристики`}
              style={{ "--sc": color, "--sf": trio ? "rgba(255,43,214,.22)" : "rgba(34,230,255,.2)" } as CSSProperties}
              onClick={() => toggle(s.n)}
              onKeyDown={(e) => onKey(e, s.n)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(s.n)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
            >
              <g filter="url(#seatGlow)">
                <rect
                  className="b"
                  x={s.x - seatW / 2}
                  y={s.y - seatH / 2}
                  width={seatW}
                  height={seatH}
                  rx="6"
                  fill="#15171d"
                  stroke={color}
                  strokeOpacity="0.85"
                  strokeWidth="1.4"
                />
                <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" pointerEvents="none">
                  {s.n}
                </text>
              </g>
              {/* увеличенная область нажатия (удобно пальцем) */}
              <rect x={s.x - seatW / 2 - 4} y={s.y - seatH / 2 - 4} width={seatW + 8} height={seatH + 8} fill="transparent" />
            </g>
          );
        })}
      </svg>

      {/* Карточка характеристик выбранного ПК */}
      <div className="seatcard" data-z={active !== null && isTrio(active) ? "trio" : "halls"} aria-live="polite">
        {active !== null && zone ? (
          <div className="sc" key={active}>
            <div className="sc-h">
              <span className="sc-n">{active}</span>
              <div>
                <b>ПК №{active}</b>
                <small>{zone.name}</small>
              </div>
              {isTrio(active) && <span className="sc-top">⚡ TOP</span>}
            </div>
            <dl className="sc-r">
              <div className="g">
                <dt>Видеокарта</dt>
                <dd>{zone.gpu}</dd>
              </div>
              <div>
                <dt>Процессор</dt>
                <dd>{zone.cpu}</dd>
              </div>
              <div>
                <dt>ОЗУ</dt>
                <dd>{zone.ram}</dd>
              </div>
            </dl>
            <div className="sc-f">
              <span>
                от <b>{minPrice} ₽</b> / час
              </span>
              <a className="sc-btn" href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer">
                Забронировать №{active}
              </a>
            </div>
          </div>
        ) : (
          <p className="mapcap" style={{ margin: "90px 0" }}>
            Выберите место на схеме, чтобы увидеть характеристики
          </p>
        )}
      </div>
    </div>
  );
}
