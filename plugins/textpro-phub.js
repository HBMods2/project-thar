import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text || !text.includes('|')) throw `Usage : ${usedPrefix + command} text1|text2\n\nExample: *${usedPrefix + command} Shiro|Neko*`
	let [l, r] = text.split`|`
    if (!l) throw `Input text1`
    if (!r) throw `Input text2`
    try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/textprome2/pornhub?apikey=${global.api}&text1=${encodeURIComponent(l)}&text2=${encodeURIComponent(r)}`)
	    //if (!fimg.ok) throw 'Fitur Error'
	    let fimgb = Buffer.from(await fimg.arrayBuffer())
		conn.sendFile(m.chat, fimgb, 'txpro2.jpg', `_Text Pro : ${command}_`, m)
	} catch (e) {
        console.log(e)
        m.reply(`An error occurred, please try again later.`)
    }
}

handler.menutextpro = ['phub <text1>|<text2>']
handler.tagstextpro = ['search']
handler.command = /^phub$/i

handler.premium = true
handler.limit = true

export default handler