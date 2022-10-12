import fs from 'fs'
import path from 'path'

const _fs = fs.promises

let handler = async (m, { usedPrefix, command, text, __dirname }) => {
	if (!m.sender.includes('6282337245566')) return m.reply('[ DEVELOPER BOT ONLY ]')
	if (!text) return m.reply(`What is the name of the plugin?\n\nExample : *${usedPrefix + command} sc*`)
	const filename = path.join(__dirname, `./${text}${!/\.js$/i.test(text) ? '.js' : ''}`)
    const listPlugins = fs.readdirSync(path.join(__dirname)).map(v => v.replace(/\.js/, ''))
    if (!fs.existsSync(filename)) return m.reply(`'${filename}' not found!\n\n*List of Plugins :*\n${listPlugins.map(v => v).join('\n').trim()}`.trim())
    m.reply(fs.readFileSync(filename, 'utf8'))
}

handler.menugroup = ['getplugin']
handler.tagsgroup = ['owner']
handler.command = /^(gp|getplugin|pg|pluginget)$/i

export default handler