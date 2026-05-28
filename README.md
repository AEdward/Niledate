# NileDate

NileDate is an Ethiopian dating platform built around Telegram.

## Vision

Build a simple, modern, and safe dating experience for Ethiopian users using a Telegram Bot and Telegram Mini App.

## Core Features

- Telegram Bot onboarding
- Telegram Mini App dating interface
- User profiles
- Swipe and like system
- Mutual match system
- Telegram username unlock after both users match
- Free users get 20 swipes
- Premium monthly subscription: 100 ETB
- Admin moderation tools

## Tech Stack

- Bot: Node.js + Telegraf
- Mini App: Next.js
- API: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Payments: Manual first, Chapa later

## Project Structure

```txt
apps/
  bot/       Telegram bot
  web/       Telegram Mini App frontend
server/      Backend API
packages/    Shared packages
prisma/      Database schema and migrations
docs/        Product and technical documentation
assets/      Branding and design assets
```

## Development Status

Initial project setup.
