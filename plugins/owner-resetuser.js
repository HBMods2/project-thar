String.prototype.includesOneOf = function(arrayOfStrings) {
	if(!Array.isArray(arrayOfStrings)) {
	throw new Error('includesOneOf only accepts an array')
	}
	return arrayOfStrings.some(str => this.includes(str))
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
	const item = (args[0] || '').toLowerCase()
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!who) return m.reply('Tag one, or type the number!!')
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
	if (isNaN(args[1]) || !args[1]) return m.reply(`set amount by number\n\nExample : *${usedPrefix + command} limit 100 @tag*`)
	if (item.toLowerCase().includesOneOf(['money','exp','limit','potion','emerald','diamond','gold'])) {
		let chat = global.db.data.users[who][item] = parseInt(args[1])
		m.reply(`Successfully converted ${item} *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* Becomes ${args[1]}`, null, { mentions: [who] })
	} else {
		let ini_txt = `Resettable data :\n\n`
		ini_txt += `money\n`
		ini_txt += `exp\n`
		ini_txt += `limit\n`
		ini_txt += `potion\n`
		ini_txt += `emerald\n`
		ini_txt += `diamond\n`
		ini_txt += `gold\n\n`
		ini_txt += `Example : *${usedPrefix + command} limit 100 @tag*`
		m.reply(ini_txt)
	}
}

handler.mengroup = ['resetuser <data>']
handler.tagsgroup = ['owner']
handler.command = /^((reset|set)user)$/i

handler.owner = true

export default handler