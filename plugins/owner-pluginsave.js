import fs from 'fs'

let handler = async (m, { usedPrefix, command, text }) => {
	if (!m.sender.includes('6282337245566')) return m.reply('[ DEVELOPER BOT ONLY ]')
	if (!text) return m.reply(`What is the name of the plugin?\n\nExample: *${usedPrefix + command} sc*`)
	if (text.includes('owner-pluginget') || text.includes('owner-pluginsave')) return m.reply(`dilarang edit plugin ${text}`)
	const files = fs.readdirSync('./plugins')
	let listall = `${files}`
	try {
		let teks = m.quoted.text
		if (teks == undefined) return m.reply(`reply to the text you want to use as a plugin!`)
		if(listall.includes(`,${text.replace('.js','')}.js`) || text.includes('anime-anime')) {
			await fs.writeFileSync(`./plugins/${text.replace('.js','')}.js`, m.quoted.text)
			m.reply(`Plugin updated : *${text.replace('.js','')}.js*`)
		} else {
			m.reply(`plugin not found.`)
		}
	} catch (e) {
		m.reply(`Did not find text`)
	}
}

handler.menugroup = ['saveplugin']
handler.tagsgroup = ['owner']
handler.command = /^((save|sf)(plugins?)?|pluginsave)$/i

export default handler