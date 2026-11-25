# C4 КИБЕР АРЕНА — Landing Page

Next.js (App Router) + Tailwind CSS. Без бэкенда и CMS.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка
npm start
```

Нужен Node.js 18.18+ (лучше 20+).

## Что редактировать

Все цены, характеристики ПК, ссылки и тексты — в одном файле: `data/config.ts`.

- `siteConfig` — название, ссылка на Telegram, контакты (пустые поля скрываются)
- `zones` — игровые зоны и железо
- `tariffs` — тарифная сетка
- `hallMap` — расположение мест на схеме зала

Фотографии лежат в `public/images/` (взяты из ТЗ).

## Структура

```
app/            layout, page, глобальные стили
components/     Header, Hero, About, Zones, Pricing, HallMap, Contacts, Footer
data/config.ts  вся конфигурация
public/images/  логотип и фото зала
```

## Демо на GitHub Pages

В папке `docs/` лежит готовая статичная демо-версия сайта (один `index.html` + картинки), ей не нужна сборка.

1. Залейте репозиторий на GitHub.
2. `Settings → Pages → Build and deployment → Source: Deploy from a branch`, ветка `main`, папка `/docs`.
3. Через минуту демо откроется на `https://<ваш-логин>.github.io/<имя-репозитория>/`.

Демо в `docs/` — отдельная статичная копия дизайна, она не пересобирается из Next-проекта автоматически.
