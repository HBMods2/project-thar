let handler = async (m, { conn, args, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let bot = conn.user.jid // Bot
			let img = await q.download()
			if (!img) return m.reply(`failed to take a picture`)
			await conn.updateProfilePicture (bot, img)
			await conn.reply(m.chat, 'Success in Changing the Bot Profile Photo!', m)
		} catch (e) {
			console.log(e)
			m.reply(`An error occurred, please try again later.`)
		}
	} else {
		m.reply(`Send image with caption *${use Prefix + command}* or reply image already sent`)
	}
}

handler.menugroup = ['setbotpp']
handler.tagsgroup = ['owner']
handler.command = /^(set(botpp|ppbot))$/i

handler.owner = true

export default handler