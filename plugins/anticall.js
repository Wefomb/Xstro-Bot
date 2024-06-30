const { smd, prefix, bot_ } = require('../lib')

const DEFAULT_ANTICALL_MESSAGE =
 '```Hi, this is Suhail-Md, a Personal Assistant!\n\nSorry, we cannot receive calls at the moment, whether in a group or personal.\n\nIf you need help or want to request features, please chat with the owner.\n\nPowered by Suhail-Md Chatbot```'

const antiCallMessage = process.env.ANTICALL_MESSAGE || DEFAULT_ANTICALL_MESSAGE
let antiCallCountries = []
let antiCallusers = {}

smd(
 {
  pattern: 'anticall',
  desc: 'Detects calls and declines them.',
  category: 'owner',
  use: '<on | off | country_codes>',
  filename: __filename,
 },
 async (message, args) => {
  const botSettings =
   (await bot_.findOne({ id: `bot_${message.user}` })) ||
   (await bot_.updateOne({ id: `bot_${message.user}` }, { $setOnInsert: { anticall: 'false' } }, { upsert: true }))

  const command = args ? args.toLowerCase().trim() : ''

  if (['off', 'deact', 'disable'].some(cmd => command.startsWith(cmd))) {
   if (botSettings.anticall === 'false') {
    return await message.reply('*AntiCall is already disabled in the current chat!*')
   }
   await bot_.updateOne({ id: `bot_${message.user}` }, { anticall: 'false' })
   return await message.reply('*AntiCall has been disabled successfully!*')
  }

  if (!args) {
   const status = botSettings.anticall === 'false' ? 'Not set' : `set to "${botSettings.anticall}"`
   return await message.reply(
    `*_AntiCall is currently ${status}._*\nProvide country codes to update status.\nE.g.: _.anticall all | 212, 91_`
   )
  }

  const countryCodes = command.includes('all')
   ? 'all'
   : args
      .split(',')
      .map(code => parseInt(code.trim()))
      .filter(code => !isNaN(code) && code > 0)
      .join(',')

  if (!countryCodes) {
   return await message.reply(`*Please provide valid country code(s)*\nExample: ${prefix}anticall all | 92, 1`)
  }

  await bot_.updateOne({ id: `bot_${message.user}` }, { anticall: countryCodes })
  return await message.reply(`*AntiCall has been successfully set to "${countryCodes}"!*`)
 }
)

smd(
 {
  call: 'offer',
 },
 async call => {
  try {
   if (call.fromMe) return

   const botSettings = await bot_.findOne({ id: `bot_${call.user}` })
   if (!botSettings || botSettings.anticall === 'false') return

   antiCallCountries = botSettings.anticall.split(',').filter(code => code.trim() !== '')
   const isBlocked =
    botSettings.anticall === 'all' || antiCallCountries.some(code => call.from?.toString()?.startsWith(code))

   if (isBlocked || call.isBot) {
    antiCallusers[call.from] = antiCallusers[call.from] || { warn: 0 }

    if (antiCallusers[call.from].warn < 2) {
     await call.reply(antiCallMessage)
    }

    antiCallusers[call.from].warn++

    await call.reply(
     `*_Call rejected from user @${call.from.split('@')[0]} (Warning ${antiCallusers[call.from].warn}/3)_*`,
     { mentions: [call.from] },
     'warn',
     '',
     call.user
    )

    return await call.decline()
   }
  } catch (error) {
   console.error('Error in AntiCall handler:', error)
  }
 }
)
