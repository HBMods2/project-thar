let handler = async (m, { conn, isOwner, isAdmin }) => {
	if (!m.quoted) throw false
	let { chat, fromMe } = m.quoted
	let charm = global.db.data.chats[m.chat]
	if (!fromMe) {
		if (isOwner || isAdmin) {
			try {
				if ((!charm.nsfw && m.isGroup) || isOwner) {
					conn.sendMessage(chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
				} else {
					m.reply(`Cannot delete message while *nsfw* is on!`)
				}
			} catch (e) {
				console.log(e)
			}
		} else {
			m.reply(`*「ADMIN GROUP ONLY」*`)
		}
	} else {
		try {
			if ((!charm.nsfw && m.isGroup) || isOwner) {
				conn.sendMessage(chat, { delete: m.quoted.vM.key })
			} else {
				m.reply(`Unable to delete message while *nsfw* is active!`)
			}
		} catch (e) {
			console.log(e)
		}
	}
}

handler.menugroup = ['del', 'delete']
handler.tagsgroup = ['group']
handler.command = /^(d(el(ete)?)?)$/i

handler.group = true

export default handler