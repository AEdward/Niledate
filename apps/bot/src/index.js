import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'
import { welcomeMessage, helpMessage } from './messages.js'

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

bot.hears('❓ Help', (ctx) => {
  ctx.reply(helpMessage)
})

bot.launch()

console.log('🚀 NileDate Bot Running')
