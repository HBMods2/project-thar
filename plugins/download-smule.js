import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await fetch(`https://api.lolhuman.xyz/api/smule?apikey=${global.api}&url=${text}`)
		let json = await anu.json()
		let ini_txt = `*[ SELECT MEDIA FORMAT ]*\n\n_${json.result.title}_\n\nKetik *${usedPrefix}smulemp3* or *${usedPrefix}smulemp4* when the buttons don't appear/work.\n`
		conn.sendButton(m.chat, ini_txt, packname + ' - ' + author, [
			[`🎧 Audio`, `${usedPrefix}smulemp3 ${text}`],
			[`🎥 Video`, `${usedPrefix}smulemp4 ${text}`]
		], m)
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Smule url.`)
	}
}

handler.menudownload = ['smule <url>']
handler.tagsdownload = ['search']
handler.command = /^(smule(play|search)?)$/i

handler.limit = true

export default handler