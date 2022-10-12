let handler = async (m, { text }) => {
	if (!text) {
		global.db.data.chats[m.chat].isBanned = false
		m.reply('Bots can be reused.')
	} else {
		try {
			global.db.data.chats[`${text.includes('@') ? text : text + '@g.us'}`].isBanned = false
			m.reply('Bots can be reused.')
		} catch (e) {
			console.log(e)
			m.reply(`The Group ID does not exist in the database.`)
		}
	}
}

handler.menugroup = ['unbanchat']
handler.tagsgroup = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler