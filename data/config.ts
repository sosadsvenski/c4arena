/**
 * ЕДИНЫЙ КОНФИГУРАЦИОННЫЙ ФАЙЛ САЙТА
 * Здесь можно менять цены, характеристики ПК, ссылки и тексты —
 * остальной код трогать не нужно.
 */
import type { DrinkArt } from "../lib/drinkSvg";

export const siteConfig = {
  name: "C4 КИБЕР АРЕНА",
  shortName: "C4",
  tagline: "Компьютерный клуб нового уровня",
  description:
    "Мощные ПК, неоновая атмосфера и удобные тарифы. Приходите играть в одиночку или с командой — места ждут вас.",
  telegramUsername: "c4arena_krd",
  telegramUrl: "https://t.me/c4arena_krd",
  ctaText: "Забронировать ПК",
  headerCtaText: "Забронировать",
  // Необязательные поля контактов: оставьте пустую строку, чтобы скрыть блок
  address: "",
  workingHours: "Круглосуточно",
  phone: "",
};

export const socials = [
  {
    id: "telegram",
    name: "Telegram",
    title: "Telegram-канал клуба",
    handle: "@c4arena_krd",
    url: siteConfig.telegramUrl,
    accent: "cyan",
  },
  {
    id: "discord",
    name: "Discord",
    title: "Discord-сервер клуба",
    handle: "discord.gg/CmxnMSHKD",
    url: "https://discord.gg/CmxnMSHKD",
    accent: "violet",
  },
] as const;

export const navLinks = [
  { label: "О клубе", href: "#about" },
  { label: "Железо", href: "#hardware" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Бар", href: "#bar" },
  { label: "Контакты", href: "#contacts" },
];

export const aboutConfig = {
  title: "О клубе",
  text: [
    "C4 КИБЕР АРЕНА — компьютерный клуб с мощным железом и атмосферой киберспортивной арены. Неоновая подсветка, удобные игровые кресла и топовая периферия создают комфорт для долгих игровых сессий.",
    "В клубе два общих зала и отдельная трио-зона для компании друзей или команды. Бронируйте место заранее в Telegram — администратор подтвердит время и подготовит ПК.",
  ],
  features: [
    { title: "20 игровых мест", text: "17 в общих залах и 3 в трио-зоне" },
    { title: "RTX 4060 — RTX 5070", text: "Современные видеокарты NVIDIA" },
    { title: "Ночные пакеты", text: "Играйте всю ночь по выгодной цене" },
    { title: "Бронь в Telegram", text: "Быстро и без регистрации" },
  ],
};

export type Zone = {
  id: string;
  name: string;
  pcCount: number;
  seats: string; // номера ПК на схеме
  cpu: string;
  gpu: string;
  ram: string;
  image: string;
  accent: "cyan" | "pink";
  /** Короткая подпись конфигурации (бейдж на карточке) */
  tag: string;
  /** Уровень мощности зоны по шкале 1–10 (визуальная шкала на карточке) */
  level: number;
  /** Подпись к шкале мощности */
  levelLabel: string;
};

export const zones: Zone[] = [
  {
    id: "halls",
    name: "Два общих зала",
    pcCount: 17,
    seats: "1–17",
    cpu: "Intel Core i5 (12400F – 13400F)",
    gpu: "RTX 4060 Ti / RTX 4060",
    ram: "16 GB",
    image: "/images/hall-2.jpg",
    accent: "cyan",
    tag: "Игровая конфигурация",
    level: 6,
    levelLabel: "Стандарт",
  },
  {
    id: "trio",
    name: "Трио зона",
    pcCount: 3,
    seats: "18–20",
    cpu: "Intel Core i5 14600KF",
    gpu: "RTX 5070",
    ram: "32 GB",
    image: "/images/hall-4.jpg",
    accent: "pink",
    tag: "Топ-конфигурация клуба",
    level: 10,
    levelLabel: "Максимум",
  },
];

export type Tariff = {
  name: string;
  note?: string; // например, часы действия пакета
  weekday: number; // ПН – ЧТ
  weekend: number; // ПТ – ВС
};

export const tariffs: Tariff[] = [
  { name: "1 час", weekday: 95, weekend: 130 },
  { name: "Пакет «3 часа»", weekday: 250, weekend: 350 },
  { name: "Пакет «5 часов»", weekday: 450, weekend: 620 },
  { name: "Пакет «Утро»", note: "08:00 – 14:00", weekday: 400, weekend: 450 },
  { name: "Пакет «День»", note: "14:00 – 20:00", weekday: 500, weekend: 680 },
  { name: "Пакет «Ночь»", note: "22:00 – 08:00", weekday: 600, weekend: 700 },
];

export const tariffsConfig = {
  title: "Тарифы",
  weekdayLabel: "ПН – ЧТ",
  weekdaySub: "будни",
  weekendLabel: "ПТ – ВС",
  weekendSub: "выходные",
  currency: "₽",
  disclaimer: "Администрация оставляет за собой право вносить изменения в стоимость тарифов.",
  hallBadge: "Схема клуба — 20 ПК",
};

/**
 * Схема зала. Координаты — в условных единицах SVG (viewBox 360 × 250).
 * x, y — центр места.
 */
export const hallMap = {
  width: 360,
  height: 250,
  seatW: 40,
  seatH: 24,
  // Места трио-зоны (подсвечиваются розовым)
  trioSeats: [18, 19, 20],
  seats: [
    { n: 18, x: 105, y: 38 },
    { n: 19, x: 154, y: 38 },
    { n: 20, x: 203, y: 38 },
    { n: 17, x: 325, y: 87 },
    { n: 16, x: 325, y: 120 },
    { n: 15, x: 325, y: 153 },
    { n: 14, x: 325, y: 186 },
    { n: 13, x: 325, y: 219 },
    { n: 9, x: 264, y: 120 },
    { n: 10, x: 264, y: 153 },
    { n: 11, x: 264, y: 186 },
    { n: 12, x: 264, y: 219 },
    { n: 8, x: 207, y: 120 },
    { n: 7, x: 207, y: 153 },
    { n: 6, x: 207, y: 186 },
    { n: 5, x: 207, y: 219 },
    { n: 4, x: 30, y: 153 },
    { n: 3, x: 30, y: 186 },
    { n: 2, x: 30, y: 219 },
    { n: 1, x: 107, y: 219 },
  ],
  // Стойка администратора
  desk: { x: 8, y: 76, w: 66, h: 36, label: "СТОЙКА", sub: "АДМИН" },
  // Область у трёх ПК сверху
  topBox: { x: 80, y: 5, w: 148, h: 66 },
  // Перегородки
  dividers: [
    { x1: 235, y1: 103, x2: 235, y2: 240 },
    { x1: 134, y1: 207, x2: 134, y2: 233 },
  ],
};

export type Drink = {
  name: string;
  note?: string;
  price: number;
  /**
   * Своё фото напитка: положите файл в public/images/bar/ и укажите путь,
   * например "/images/bar/burn.webp". Если поле не задано — рисуется иллюстрация.
   */
  image?: string;
  /** ширина файла `image` в пикселях, если она не 340 (высота всегда 740) */
  imageWidth?: number;
  art: DrinkArt;
};

export type DrinkGroup = { name: string; columns: 3 | 4; items: Drink[] };

export const barMenu: { title: string; currency: string; groups: DrinkGroup[] } = {
  title: "Меню бара",
  currency: "₽",
  groups: [
    {
      name: "Энергетики",
      columns: 4,
      items: [
        { name: "Burn оригинал", note: "0,449 л", price: 170, image: "/images/bar/burn-original.webp", art: { kind: "can", c: "#e63946", c2: "#3a0a10", icon: "bolt" } },
        { name: "Burn яблоко киви", note: "0,449 л", price: 170, image: "/images/bar/burn-apple-kiwi.webp", art: { kind: "can", c: "#7ed321", c2: "#143d0c", icon: "apple" } },
        { name: "Burn тропический", note: "0,449 л", price: 170, image: "/images/bar/burn-tropical.webp", art: { kind: "can", c: "#a66bff", c2: "#2a1054", icon: "sun" } },
        { name: "Burn гуава", note: "0,449 л", price: 170, image: "/images/bar/burn-guava.webp", art: { kind: "can", c: "#ff7a99", c2: "#4d0a2a", icon: "guava" } },
      ],
    },
    {
      name: "Напитки",
      columns: 3,
      items: [
        { name: "Добрый кола", note: "0,5 л", price: 120, image: "/images/bar/cola.webp", art: { kind: "bottle", c: "#c1121f", c2: "#1f0e07", icon: "bubbles" } },
        { name: "Сок добрый яблочный", note: "0,3 л", price: 120, image: "/images/bar/juice.webp", art: { kind: "carton", c: "#3aa655", c2: "#0f3d1a", icon: "apple" } },
        { name: "Вода Bonaqua", note: "0,5 л · без газа / с газом", price: 80, image: "/images/bar/water.webp", imageWidth: 400, art: { kind: "water", c: "#4fc3ff", c2: "#0b3a5c", icon: "drop" } },
      ],
    },
  ],
};

export const gallery =["/images/hall-1.jpg", "/images/hall-2.jpg", "/images/hall-3.jpg", "/images/hall-4.jpg"];
