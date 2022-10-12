let handler = async (m, { text }) => {
	let hash = text
	if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
	if (!hash) throw `Tidak ada hash`
	let sticker = global.db.data.sticker
	if (sticker[hash] && sticker[hash].locked) throw 'You do not have permission to delete this sticker command'
	delete sticker[hash]
	m.reply(`Succeed!`)
}


handler.menugroup = ['cmddel <teks>']
handler.tagsgroup = ['owner']
handler.command = /^(delcmd|cmddel)$/i

handler.owner = true

export default handler
