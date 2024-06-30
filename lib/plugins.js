/**
 * @typedef {Object} Command
 * @property {function} function - The function to be executed for this command
 * @property {string} [pattern] - The pattern to match for this command
 * @property {string[]} [alias=[]] - Aliases for this command
 * @property {boolean} [dontAddCommandList=false] - Whether to exclude this command from the command list
 * @property {string} [desc=""] - Description of the command
 * @property {boolean} [fromMe=false] - Whether this command can only be executed by the bot owner
 * @property {string} [category="misc"] - The category of the command
 * @property {string} [use=""] - Usage instructions for the command
 * @property {string} [filename="Not Provided"] - The filename where this command is defined
 */

/** @type {Command[]} */
const commands = []

/**
 * Adds a new command to the commands array
 * @param {Partial<Command>} commandObj - The command object
 * @param {function} handler - The function to handle the command
 * @returns {Command} The complete command object
 */
function Index(commandObj, handler) {
 /** @type {Command} */
 const command = {
  ...commandObj,
  function: handler,
  pattern: commandObj.pattern || commandObj.cmdname || '',
  alias: commandObj.alias || [],
  dontAddCommandList: commandObj.dontAddCommandList || false,
  desc: commandObj.desc || commandObj.info || '',
  fromMe: commandObj.fromMe || false,
  category: commandObj.category || commandObj.type || 'misc',
  use: commandObj.use || '',
  filename: commandObj.filename || 'Not Provided',
 }

 command.info = command.desc
 command.type = command.category

 commands.push(command)
 return command
}
const xstro = Index
module.exports = {
 Index,
 xstro,
 cmd: Index,
 smd: Index,
 commands,
 bot: Index,
}
