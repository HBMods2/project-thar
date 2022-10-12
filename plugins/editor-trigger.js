import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from 'fs'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
    	try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			const res = `https://api.lolhuman.xyz/api/creator1/trigger?apikey=${global.api}&img=${out}`
			const stiker = await sticker(false, res, global.packname, global.author)
	        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    	} catch (e) {
    		console.log(e)
	        await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
    	}
    } else {
    	m.reply(`Send image with caption *${use Prefix + command}* or tag image already sent`)
    }
}

handler.menueditor = ['trigger']
handler.tagseditor = ['search']
handler.command = /^(trigger(ed)?)$/i

handler.premium = true
handler.limit = true

export default handler