let handler = async (m, { text }) => {
	if (!text) {
		global.db.data.chats[m.chat].isBanned = true
		m.reply('The bot is in listening mode.')
	} else {
		try {
			global.db.data.chats[`${text.includes('@') ? text : text + '@g.us'}`].isBanned = true
			m.reply('The bot is in listening mode.')
		} catch (e) {
			console.log(e)
			m.reply(`Group ID not in database.`)
		}
	}
}

handler.menugroup = ['banchat']
handler.tagsgroup = ['owner']
handler.command = /^(banchat)$/i

handler.owner = true

export default handler