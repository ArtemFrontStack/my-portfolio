# Portfolio — Современное портфолио fullstack-разработчика

## О проекте

Это персональное портфолио для демонстрации навыков, проектов и опыта fullstack-разработчика. Используются современные технологии: React, Angular, NestJS, Express, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, GSAP и др. Реализованы анимации, адаптивная верстка, интерактивные компоненты, форма обратной связи с EmailJS, интеграция с соцсетями.

---

## Основные возможности

- Современный дизайн и адаптивная верстка
- Анимации появления и параллакса (GSAP)
- Кастомный курсор и плавные переходы
- Секция проектов с модальными окнами
- Форма обратной связи с валидацией и EmailJS
- Интерактивные графики и статистика
- Навигация без перезагрузки (React Router)
- Тёмная/светлая тема (shadcn/ui, next-themes)
- SVG-иконки (VK, Telegram, GitHub)
- Легко расширяемая архитектура

---

## Технологии

- **Vite** — быстрый сборщик
- **React 18** — декларативный UI
- **TypeScript** — строгая типизация
- **Tailwind CSS** — утилитарные стили
- **shadcn/ui** и **Radix UI** — современный UI-kit
- **GSAP** — анимации и параллакс
- **EmailJS** — отправка писем из формы
- **React Hook Form** и **Zod** — валидация форм
- **Lucide-react** — иконки
- **React Router** — маршрутизация
- **Recharts** — графики и диаграммы

---

## Структура проекта

```
src/
  assets/         # Изображения и SVG-иконки (vk.svg, telegram и др.)
  components/
    common/       # Общие компоненты (кастомный курсор, лоадер, анимации)
    features/     # Форма обратной связи, модальные окна, скиллбары
    layout/       # Layout, Footer, Navigation
    sections/     # Hero, About, Skills, Projects, Contact и др.
    ui/           # UI-компоненты (кнопки, инпуты, диалоги и др.)
  config/         # Конфиги (например, emailjs)
  hooks/          # Кастомные хуки (анимации, эффекты, toast)
  lib/            # Утилиты
  pages/          # Страницы для роутинга
public/           # Статические файлы
```

---

## Быстрый старт

1. **Клонируйте репозиторий:**
   ```sh
   git clone <ВАШ_НОВЫЙ_GIT_URL>
   cd <ИМЯ_ПАПКИ_ПРОЕКТА>
   ```
2. **Установите зависимости:**
   ```sh
   npm install
   ```
3. **Запустите проект:**
   ```sh
   npm run dev
   ```
4. **Откройте в браузере:**
   Перейдите по адресу, который покажет консоль (обычно http://localhost:5173)

---

## Деплой

Для деплоя используйте любой современный хостинг для React/Vite:
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Render](https://render.com/)

---

## Настройка EmailJS

1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/).
2. Создайте сервис, шаблон и получите user ID.
3. Пропишите параметры в файле `src/config/emailjs.config.ts`.

---

## Настройка домена

Для подключения своего домена настройте DNS на стороне выбранного хостинга согласно его инструкции.

---

## Контакты

- [VK](https://vk.com/id522748848)
- [Telegram](https://t.me/artem-front)
- [GitHub](https://github.com/CyberArt2718281)

---

## Скриншоты

_Добавьте сюда скриншоты интерфейса для большей наглядности (опционально)._

---

## Лицензия

MIT

---

## Благодарности

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [GSAP](https://gsap.com/)
- [EmailJS](https://www.emailjs.com/)
- [Lucide Icons](https://lucide.dev/)

---


