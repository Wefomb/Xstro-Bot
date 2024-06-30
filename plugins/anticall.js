const antiCallMessage =
 process.env.ANTICALL_MESSAGE ||
 '```Hi, this is Suhail-Md, a Personal Assistant!!\n\n\tSorry, we cannot receive calls at the moment, whether in a group or personally.\n\nIf you need help or want to request features, please contact the owner.\n\n\nPowered by Suhail-Md Chatbot```'

const { smd, bot_, prefix } = require('../lib')

let antiCallCountries = []
let antiCallUsers = {}
let bots = false

// Command handler for setting anti-call feature
smd(
 {
  pattern: 'anticall',
  desc: 'Detects calls and declines them.',
  category: 'Owner',
  use: '<on | off>',
  filename: __filename,
 },
 async (client, message) => {
  let botData = (await bot_.findOne({ id: '465' + message.user })) || (await bot_.findOne({ id: '465' + message.user }))
  let command = message.data ? message.data.toLowerCase().trim() : ''

  if (command.startsWith('enable') || command.startsWith('disable')) {
   if (botData.anticall === 'false' && command.startsWith('disable')) {
    return await client.send('*anticall Already Disabled In Current Chat!*')
   }
   await bot_.updateOne({ id: '465' + message.user }, { anticall: 'false' })
   return await client.send('*anticall Disable Successfully!*')
  } else if (!message.data) {
   return await client.send(
    `*anticall ${botData.anticall === 'false' ? 'Not set to any' : `Succesfully set to "${botData.anticall}"`}!*`
   )
  }

  let countries = command.includes(',')
   ? command
      .split(',')
      .map(num => parseInt(num))
      .toString()
   : false
  if (!message.data || !countries) {
   return await client.send(`*Please provide a valid country code.*\n*Example: ${prefix}anticall all,212,91_*`)
  } else if (countries) {
   await bot_.updateOne({ id: '465' + message.user }, { anticall: '' + countries })
   return await client.send(`*anticall Set to "${countries}" Successfully!*`)
  } else {
   return await client.send(`*Please provide country code to block calls.*\n*Example: ${prefix}anticall all,212,91_*`)
  }
 }
)

// Call handler for detecting and declining calls
smd(
 {
  call: true,
 },
 async message => {
  try {
   if (!bots) {
    bots = await bot_.findOne({ id: '465' + message.user })
   }
   if (message.isBot || !bots || !bots.anticall || bots.anticall === 'false') {
    return
   }

   if (!antiCallCountries || !antiCallCountries[0]) {
    antiCallCountries = bots.anticall?.split(',') || []
    antiCallCountries = antiCallCountries.filter(code => code.toLowerCase() !== '')
   }

   let countryCode = ('' + bots.anticall).includes('all') ? 'all' : ''
   let isBlocked =
    countryCode === 'all' ? true : antiCallCountries.some(code => message.from?.toLowerCase()?.startsWith(code))

   if (isBlocked || message.isGroup) {
    try {
     if (!antiCallUsers || !antiCallUsers[message.from]) {
      antiCallUsers[message.from] = { warn: 0 }
     }

     if (antiCallUsers[message.from].warn < 2) {
      await message.send(antiCallMessage)
     }

     antiCallUsers[message.from].warn++
     await message.decline()
    } catch (error) {
     console.warn(error)
    }
   }
  } catch (error) {
   console.error(error)
  }
 }
)
