const Config = require('../config')
let { sendGImages, smd } = require('../lib')
const axios = require('axios')
const fetch = require('node-fetch')
const { fetchJson } = require('../lib/')
async function sendAnime(bot, message, category, args = '') {
 try {
  const [param, count = '1'] = args.split('|')
  const isNsfw = param === 'nsfw'
  const defaultCaption = ` *${category},𝔁𝓼𝓽𝓻𝓸 𝓰𝓸𝓽...*`
  const caption = args.split('|')[1] ? '' : defaultCaption

  switch (category) {
   case 'waifu':
   case 'neko':
   case 'trap':
    const baseUrl = isNsfw ? 'https://api.waifu.pics/nsfw/' : 'https://api.waifu.pics/sfw/'
    const url = category === 'trap' ? baseUrl + 'trap' : baseUrl + category

    for (let i = 0; i < parseInt(count); i++) {
     const response = await fetch(url)
     const data = await response.json()
     await bot.sendMessage(
      message.chat,
      {
       image: { url: data.url },
       caption: caption,
      },
      { quoted: message }
     )
    }
    break

   case 'shinobu':
   case 'megumin':
    const apiUrl = category === 'shinobu' ? 'https://waifu.pics/api/sfw/shinobu' : 'https://api.waifu.pics/sfw/megumin'
    const { data } = await axios.get(apiUrl)
    await bot.sendMessage(
     message.chat,
     {
      image: { url: data.url },
     },
     { quoted: message }
    )
    break

   case 'demon':
   case 'naruto':
    const videoUrl = `https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/${
     category === 'demon' ? 'Demonslayer' : 'Naruto'
    }/video.json`
    const videoData = await fetchJson(videoUrl)
    const randomVideo = videoData.result[Math.floor(Math.random() * videoData.result.length)].url
    await bot.sendMessage(message.chat, {
     video: { url: randomVideo },
     caption: '*𝔁𝓼𝓽𝓻𝓸 𝓰𝓸𝓽...*',
    })
    break

   case 'animenews':
    const newsApiKey = 'cd4116be09ef4a0caceedf21b6258460' // Consider moving this to a secure environment variable
    const newsUrl = `https://newsapi.org/v2/everything?q=${args}&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedat&apikey=${newsApiKey}&pageSize=8`
    const newsResponse = await axios.get(newsUrl)
    const articles = newsResponse.data.articles

    for (const article of articles) {
     try {
      await bot.sendMessage(
       message.chat,
       {
        image: { url: article.urlToImage },
        caption: `*Title🔰:* ${article.title}\n\n*Content🧩:* ${article.content}\n*Author📌:* ${article.author}\n*Source♦️:* ${article.source.name}\n*Created On☘️:* ${article.publishedAt}\n*More on✨:* ${article.url}\n\n${Config.caption}*`,
       },
       { quoted: message }
      )
     } catch (error) {
      console.error('Error sending news article:', error)
     }
    }
    break

   default:
    throw new Error(`Unknown category: ${category}`)
  }
 } catch (error) {
  console.error('./commands/Anime.js/sendAnime()\n', error)
  await message.error(error)
 }
}

smd(
 {
  pattern: 'waifu',
  desc: 'To get Waifu Random Pics',
  category: 'anime',
  filename: __filename,
 },
 async (message, match, { cmdName }) => {
  try {
   return await sendAnime(message, message, 'waifu', match)
  } catch {}
 }
)

smd(
 {
  pattern: 'neko',
  desc: 'Sends a Neko Image in chat',
  category: 'anime',
  filename: __filename,
 },
 async (message, match, { cmdName }) => {
  try {
   return await sendAnime(message, message, 'neko', match)
  } catch {}
 }
)

smd(
 {
  pattern: 'megumin',
  desc: 'To get Waifu Random Pics',
  category: 'anime',
  filename: __filename,
 },
 async (message, match, { cmdName }) => {
  try {
   return await sendAnime(message, message, 'megumin', match)
  } catch {}
 }
)

smd(
 {
  pattern: 'loli',
  desc: 'Sends image of loli.',
  category: 'anime',
  filename: __filename,
 },
 async (message, match) => {
  try {
   return await sendAnime(message, message, 'loli')
  } catch {}
 }
)

smd(
 {
  pattern: 'demon',
  desc: 'To get Naruto Random Videos',
  category: 'anime',
  filename: __filename,
 },
 async (message, match) => {
  try {
   return await sendAnime(message, message, 'demon')
  } catch {}
 }
)

smd(
 {
  pattern: 'naruto',
  desc: 'To get Naruto Random Videos',
  category: 'anime',
  filename: __filename,
 },
 async (message, match) => {
  try {
   return await sendAnime(message, message, 'naruto')
  } catch {}
 }
)

smd(
 {
  pattern: 'pokepic',
  desc: 'Sends image of pokemon.',
  category: 'anime',
  filename: __filename,
 },
 async (message, match) => {
  try {
   return await sendGImages(message, match + 'Pokemon Pics only HD ', '*---「 Poke Pic 」---*', match)
  } catch {}
 }
)

smd(
 {
  pattern: 'animewall',
  desc: 'Anime Wallpaper Random',
  category: 'anime',
  filename: __filename,
 },
 async (message, match) => {
  try {
   return await sendGImages(
    message,
    match + 'anime wallpaper for desktop full hd',
    '*---「 Anime Wallpaper 」---*',
    match
   )
  } catch {}
 }
)

smd(
 {
  pattern: 'pokemon',
  desc: 'Sends info of pokemon in current chat.',
  category: 'anime',
  filename: __filename,
 },
 async (message, pokemonName) => {
  try {
   if (!pokemonName) {
    return message.reply('*Uhh Please Give Me Poki Name/num*')
   }
   try {
    let { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
    if (!data.name) {
     return message.reply('❌ Could not find any pokemon with that name')
    }
    let pokemonInfo = `*•Name: ${data.name}*\n*•Pokedex ID: ${data.id}*\n*•Height: ${data.height}*\n*•Weight: ${data.weight}*\n`
    pokemonInfo += `*•Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}*\n`
    pokemonInfo += `*•Base Experience: ${data.base_experience}*\n*•Type: ${data.types[0].type.name}*\n`
    pokemonInfo += `*•Base Stat: ${data.stats[0].base_stat}*\n*•Attack: ${data.stats[1].base_stat}*\n`
    pokemonInfo += `*•Defense: ${data.stats[2].base_stat}*\n*•Special Attack: ${data.stats[3].base_stat}*\n`
    pokemonInfo += `*•Special Defense: ${data.stats[4].base_stat}*\n*•Speed: ${data.stats[5].base_stat}*\n`

    return await Suhail.bot.sendMessage(
     message.jid,
     {
      image: {
       url: data.sprites.front_default,
      },
      caption: pokemonInfo,
     },
     {
      quoted: message,
     }
    )
   } catch (error) {
    message.reply("*_Ahh, Couldn't find any pokemon._*")
   }
  } catch {}
 }
)

smd(
 {
  pattern: 'kaneki',
  desc: 'Sends a random image of Kaneki from Tokyo Ghoul.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/kaneki'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Kaneki from Tokyo Ghoul.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: kaneki`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)
// Command for Akira
smd(
 {
  pattern: 'akira',
  desc: 'Sends a random image of Akira.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/akira'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Akira.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: akira`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)
// Command for Anna
smd(
 {
  pattern: 'anna',
  desc: 'Sends a random image of Anna.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/anna'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Anna.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: anna`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Asuna
smd(
 {
  pattern: 'asuna',
  desc: 'Sends a random image of Asuna.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/asuna'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Asuna.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: asuna`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)
// Command for Anna
smd(
 {
  pattern: 'anna',
  desc: 'Sends a random image of Anna.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/anna'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Anna.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: anna`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Asuna
smd(
 {
  pattern: 'asuna',
  desc: 'Sends a random image of Asuna.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/asuna'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Asuna.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: asuna`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)
// Command for Boruto
smd(
 {
  pattern: 'boruto',
  desc: 'Sends a random image of Boruto.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/boruto'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Boruto.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: boruto`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Chiho
smd(
 {
  pattern: 'chiho',
  desc: 'Sends a random image of Chiho.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/chiho'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Chiho.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: chiho`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Eba
smd(
 {
  pattern: 'eba',
  desc: 'Sends a random image of Eba.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/eba'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Eba.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: eba`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Elaina
smd(
 {
  pattern: 'elaina',
  desc: 'Sends a random image of Elaina.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/elaina'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Elaina.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: elaina`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Ezra
smd(
 {
  pattern: 'ezra',
  desc: 'Sends a random image of Ezra.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/erza'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Ezra.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: ezra`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Inori
smd(
 {
  pattern: 'inori',
  desc: 'Sends a random image of Inori.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/inori'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Inori.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: inori`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Itachi
smd(
 {
  pattern: 'itachi',
  desc: 'Sends a random image of Itachi.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/itachi'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Itachi.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: itachi`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Itori
smd(
 {
  pattern: 'itori',
  desc: 'Sends a random image of Itori.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/itori'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Itori.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: itori`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Kaga
smd(
 {
  pattern: 'kaga',
  desc: 'Sends a random image of Kaga.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/kaga'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Kaga.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: kaga`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Kaori
smd(
 {
  pattern: 'kaori',
  desc: 'Sends a random image of Kaori.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/kaori'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Kaori.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: kaori`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Kotori
smd(
 {
  pattern: 'kotori',
  desc: 'Sends a random image of Kotori.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/kotori'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Kotori.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: kotori`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Kurumi
smd(
 {
  pattern: 'kurumi',
  desc: 'Sends a random image of Kurumi.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/kurumi'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Kurumi.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: kurumi`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Miku
smd(
 {
  pattern: 'miku',
  desc: 'Sends a random image of Miku.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/miku'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Miku.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: miku`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Naruto
smd(
 {
  pattern: 'naruto',
  desc: 'Sends a random image of Naruto.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/naruto'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Naruto.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: naruto`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Nezuko
smd(
 {
  pattern: 'nezuko',
  desc: 'Sends a random image of Nezuko.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/nezuko'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Nezuko.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: nezuko`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Sakura
smd(
 {
  pattern: 'sakura',
  desc: 'Sends a random image of Sakura.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/sakura'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Sakura.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: sakura`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Sasuke
smd(
 {
  pattern: 'sasuke',
  desc: 'Sends a random image of Sasuke.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/sasuke'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Sasuke.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: sasuke`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Husbu
smd(
 {
  pattern: 'husbu',
  desc: 'Sends a random image of Husbu.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/husbu'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Husbu.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: husbu`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)

// Command for Shota
smd(
 {
  pattern: 'shota',
  desc: 'Sends a random image of Shota.',
  category: 'anime',
 },
 async m => {
  try {
   const apiUrl = 'https://api.maher-zubair.tech/anime/shota'
   const response = await fetch(apiUrl)

   if (!response.ok) {
    return await m.send(`*_Error: ${response.status} ${response.statusText}_*`)
   }

   const data = await response.json()

   if (data.status !== 200) {
    return await m.send(`*_Error: ${data.status} - ${data.developer || 'Unknown error'}_*`)
   }

   const { url } = data

   if (!url) {
    return await m.send('*_No image found!_*')
   }

   const caption = 'Random image of Shota.'
   await m.bot.sendFromUrl(m.from, url, caption, m, {}, 'image')
  } catch (error) {
   await m.error(`${error}\n\ncommand: shota`, error, '*_Uhh dear, an error occurred!_*')
  }
 }
)
smd(
 {
  pattern: 'animesearch',
  fromMe: false,
  desc: 'Search for anime details',
  type: 'anime',
 },
 async (message, match) => {
  try {
   const query = match[1].trim()
   const response = await axios.get(`https://api.maher-zubair.tech/anime/search?q=${encodeURIComponent(query)}`)
   const anime = response.data.result

   const title = anime.title.english || anime.title.romaji || anime.title.native
   const description = anime.description
   const genres = anime.genres.join(', ')
   const status = anime.status
   const episodes = anime.episodes
   const coverImage = anime.coverImage.medium

   const messageText = `*Title:* ${title}\n*Genres:* ${genres}\n*Status:* ${status}\n*Episodes:* ${episodes}\n*Description:* ${description}`

   await message.send(messageText, { quoted: message.data, thumbnail: coverImage })
  } catch (error) {
   console.error('Error fetching anime details:', error)
   await message.send('_Failed to fetch anime details._', { quoted: message.data })
  }
 }
)
