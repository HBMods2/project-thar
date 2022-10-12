import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
		let res = await fetch(`https://api.popcat.xyz/car`)
		let json = await res.json()
		conn.sendButton(m.chat, `_Random pic : car_\n${json.title}`, packname + ' - ' + author, json.image, [[`⧑ next car ⧑`, `${usedPrefix + command}`]], m)
	} catch (e) {
		console.log(e)
		m.reply(`Command ${command} is crashing.`)
	}
}

handler.help = ['car']
handler.tags = ['entertainment']
handler.command = /^((random)?(car|mobil)(random)?)$/i

handler.premium = true
handler.limit = true

export default handler