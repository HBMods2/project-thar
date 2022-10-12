//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 7200000

function ranNumb(min = null, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

let handler = async (m, { conn, text }) => {
	let who = m.mentionedJid[0]
	if (!who) return m.reply('Tag the one you want to trade with')
	if (typeof global.db.data.users[who] == 'undefined') return m.reply('User does not exist in database')
	let user = global.db.data.users[m.sender]
	let user2 = global.db.data.users[who]
	if (new Date - user.lastdagang <= cooldown) return m.reply(`You are already trading, wait 🕖 *${((user.lastdagang + cooldown) - new Date()).toTimeString()}* lagi . . .`)
	if (10000 > user.money) return m.reply('Capital Required !!\nYou don't have 10000 Money')
	if (new Date - user2.lastdagang <= cooldown) return m.reply(`Your friend is trading, find another partner or wait *${((user2.lastdagang + cooldown) - new Date()).toTimeString()}* lagi . . .`)
	if (10000 > user2.money) return m.reply('Capital Required !!\nYour partner does not have 10000 Money')
	let dapat
	user.money -= 10000
	user2.money -= 10000
	user.lastdagang = new Date * 1
	user2.lastdagang = new Date * 1
	conn.reply(m.chat, `Please be patient..\You and ${conn.get Name(who)} are trading.. \and\nCapital respectively = 10000`, m)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Trading Income ]\n\n💵 +${get} for you and ${conn.getName(who)}`, m)
	}, 1800000)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Trading Income ]\n\n💵 +${got} for you and ${conn.getName(who)}`, m)
}, 3600000)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
		conn.reply(m.chat, `[ Trading Income ]\n\n💵 +${got} for you and ${conn.getName(who)}`, m)
}, 5400000)
	setTimeout(() => {
		dapat = ranNumb(7000, 12000)
		user.money  += dapat
		user2.money += dapat
conn.reply(m.chat, `[ Trade Income ]\n\n💵 +${get} for you and ${conn.getName(who)}`, m)
	}, 72000000)
}

handler.menufun = ['berdagang']
handler.tagsfun = ['rpg']
handler.command = /^((ber)?dagang)$/i

handler.cooldown = cooldown
handler.group = true
handler.limit = true

export default handler