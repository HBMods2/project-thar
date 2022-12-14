import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text || !text.includes('|')) throw `Usage : ${usedPrefix + command} text1|text2|text3\n\nExample: *${usedPrefix + command} Shiro|Neko*`
	let [l, r, s] = text.split`|`
    if (!l) throw `Input text1`
    if (!r) throw `Input text2`
    if (!s) throw `Input text3`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/ephoto3/${command}?apikey=${global.api}&text1=${encodeURIComponent(l)}&text2=${encodeURIComponent(r)}&text3=${encodeURIComponent(s)}`)
		if (!fimg.ok) throw new e()
	    let fimgb = Buffer.from(await fimg.arrayBuffer())
		conn.sendFile(m.chat, fimgb, 'ephoto3.jpg', `_Ephoto 360 : ${command}_`, m)
	} catch (e) {
		m.reply(`An error occurred, please try again later.`)
	}
}

handler.menuephoto = ['valorantbanner <text>']
handler.tagsephoto = ['search']
handler.command = /^(valorantbanner)$/i

handler.premium = true
handler.limit = true

export default handler