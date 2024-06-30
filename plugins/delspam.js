const { smd, tlang, prefix } = require('../lib')

/**
 * Loads messages from a chat, optionally filtered by a specific user
 * @param {Object} store - The message store object
 * @param {string} chatId - The chat ID to load messages from
 * @param {string} [userId] - Optional user ID to filter messages
 * @returns {Promise<Array>} - Array of loaded messages
 */
async function loadMessages(store, chatId, userId = '') {
 try {
  const targetUserId = userId ? userId.split('@')[0] : chatId.split('@')[0]
  const allMessages = await store.loadMessages(chatId)
  return allMessages.filter(msg => msg.key.participant?.includes(targetUserId))
 } catch (error) {
  console.error('Error in loadMessages:', error)
  return []
 }
}

smd(
 {
  pattern: 'delspam',
  category: 'misc',
  desc: 'Delete messages of user from chat',
  use: '[ 4/ 6/ 10 ]',
  usage: 'Delete messages of replied/@mentioned user from chat by giving number of messages!',
  filename: __filename,
 },
 async (message, args, { store }) => {
  try {
   if (!message.isGroup) {
    return await message.send(tlang('group'))
   }
   if (!message.isBotAdmin) {
    return await message.send('I am Not Admin!')
   }
   if (!message.isAdmin && !message.isCreator) {
    return await message.send(tlang('admin'))
   }

   const targetUser = message.quoted?.senderNum || message.mentionedJid[0]
   if (!targetUser) {
    return await message.send(
     `*Please reply/@user to delete messages!*\n*Use '${prefix}delspam 5 @user' (delete 5 msgs)*`
    )
   }

   const userMessages = await loadMessages(store, message.chat, targetUser)
   const deleteCount = parseInt(args.split(' ')[0]) || 5
   const startIndex = Math.max(0, userMessages.length - deleteCount)

   for (let i = userMessages.length - 1; i >= startIndex; i--) {
    try {
     if (userMessages[i]) {
      await message.delete(userMessages[i])
     }
    } catch (deleteError) {
     console.error('Error deleting message:', deleteError)
    }
   }

   await message.send(`Deleted ${deleteCount} messages from ${targetUser}.`)
  } catch (error) {
   console.error('Error in delspam command:', error)
   await message.send('An error occurred while deleting messages.')
  }
 }
)
