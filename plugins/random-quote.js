import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	await delay(2000)
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/random/quotes?apikey=${global.api}`)
		let json = await res.json()
		conn.sendButton(m.chat, `_${json.result.quote}_\n\n*― ${json.result.by}*`, `⭔ Random Quote ⭔`, null, [[`⧑ next ${command} ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		m.reply(`An error occurred, please try again later.`)
	}
}

handler.help = ['quote']
handler.tags = ['randomtext']
handler.command = /^(quotes?)$/i

handler.premium = true
handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))