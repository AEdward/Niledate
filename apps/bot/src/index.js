import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'
import { welcomeMessage, helpMessage } from './messages.js'

import {
  startProfileFlow,
  hasActiveProfileFlow,
  handleProfileText,
  handleProfilePhoto
} from './profile-flow.js'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
  ctx.reply(
    welcomeMessage,
    Markup.keyboard([
      ['💘 Open NileDate'],
      ['👤 Create Profile'],
      ['⭐ Premium'],
      ['❓ Help']
    ]).resize()
  )
})

bot.hears('👤 Create Profile', (ctx) => {
  startProfileFlow(ctx)
})

bot.hears('❓ Help', (ctx) => {
  ctx.reply(helpMessage)
})

bot.on('text', async (ctx, next) => {
  if (hasActiveProfileFlow(ctx)) {
    const handled = await handleProfileText(ctx)
    if (handled) return
  }

  return next()
})

bot.on('photo', async (ctx, next) => {
  const handled = await handleProfilePhoto(ctx)
  if (handled) return

  return next()
})

bot.launch()

console.log('🚀 NileDate Bot Running')
