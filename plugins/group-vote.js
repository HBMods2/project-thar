let handler = async (m, { conn, usedPrefix, command }) => {
	let id = m.chat
	conn.vote = conn.vote ? conn.vote : {}
	if (!(id in conn.vote)) throw `_*no voting in this group!*_\n\n*${used Prefix}vote* - to start voting`
	let isVote = conn.vote[id][1].concat(conn.vote[id][2])
	const wasVote = isVote.includes(m.sender)
	if (wasVote) throw 'You've voted!'
	if (/up/i.test(command)) {
		conn.vote[id][1].push(m.sender)
		m.reply(`done upvote!\n\n${usedPrefix}checkvote* to see the list`
	} else if (/de/i.test(command)) {
		conn.vote[id][2].push(m.sender)
		m.reply(`done devotee!\n\n*${usedPrefix}checkvote* to see list`)
	}

}

handler.menugroup = ['vote']
handler.tagsgroup = ['group']
handler.command = /^((up|de)vote)$/i

handler.group = true

export default handler 