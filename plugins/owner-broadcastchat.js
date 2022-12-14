import { randomBytes } from 'crypto'

function ranNumb(min = null, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && !jid.startsWith('212') && chat.isChats).map(v => v[0])
	let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
	let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) || /video/g.test(mime)) {
	    if (!text) throw `where is the text? ?`
    	let img = await q.download?.()
		conn.reply(m.chat, `Send a broadcast message to ${chats.length} chats`, m)
		let wkt
		for (let id of chats) {
			try {
				/*conn.sendHydrated(id, `_*「 BroadCast-Bot 」*_\n\n${text}`, packname + ' - ' + author, img, 'https://chat.whatsapp.com/CXhNwLK5cijJl5HPRFisNh', 'Minimalist ツ Sweet', null, null, [
					['Premium', '.premium'],
					['Contact', '.owner'],
					['⦿ ALL MENU ⦿', '.menuall']
				])*/
				conn.sendButton(id, `_*「 BroadCast-Bot 」*_\n\n${text}`, packname + ' - ' + author, img, [
					[`👥 Owner`, `.owner`],
					[`🤖 All Menu`, `.allmenu`]
				])
				wkt = ranNumb(3000, 6000)
				await delay(wkt)
			} catch (e) {
				console.log(e)
			}
		}
		m.reply('Done Broadcast All Private Chat :)')
    } else {
        m.reply(`Send image with caption *${use Prefix + command}* or tag image already sent`)
    }
}

handler.menugroup = ['broadcastchat'].map(v => v + ' <teks>')
handler.tagsgroup = ['owner']
handler.command = /^((bc|broadcast)chats?|bcc)$/i

handler.owner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
const delay = time => new Promise(res => setTimeout(res, time))