let handler = async (m, { conn, args, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let img = await q.download()
			if (!img) throw 'failed to take a picture'
			await conn.updateProfilePicture(m.chat, img)
			await conn.reply(m.chat, 'Success Changing Icon Group!', m)
		} catch (e) {
			console.log(e)
			m.reply(`An error occurred, please try again later.`)
		}
	} else {
		m.reply(`Send image with caption *${use Prefix + command}* or tag image already sent`)
	}
}

handler.menugroup = ['setppgc']
handler.tagsgroup = ['group']
handler.command = /^(set((gro?up|gc)pp|pp(gro?up|gc)))$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler