import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'
import os from 'os'

function ranNumb(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

function padLead(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

function runtime(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + "d " : "";
	var hDisplay = h < 10 ? "0" + h + ":" : h > 0 ? h + ":" : "";
	var mDisplay = m < 10 ? "0" + m + ":" : m > 0 ? m + ":" : "";
	var sDisplay = s < 10 ? "0" + s : s > 0 ? s : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

let tags = {
	'submenu': 'πͺ *SUB MENU*',
	'searching': 'π *SEARCHING*',
	'randomtext': 'β»οΈ *RANDOM TEXT*',
	'information': 'π€ *INFORMATION*',
	'entertainment': 'π‘ *ENTERTAINMENT*',
	'primbon': 'π *PRIMBON*',
	'creator': 'π±π» *CREATOR*',
	'tools': 'βοΈ *TOOLS MENU*',
}
const defaultMenu = {
	before: `
ββββ *γ HBWABot v2 Menu γ* 
β
ββ§ βΈ¨ *.owner* βΈ©
ββ§ βΈ¨ *.info* βΈ©
ββ§ βΈ¨ *.levelup* βΈ©
β ββββββββββββββββββ
ββ§ π Runtime : *%uptime*
ββ§ π OS Uptime : *%osuptime*
ββββββββββββββββββββββ

β­βββγ *INFO* γ
β β’ Name  : %name!
β β’ Role : *%role*
β β’ Limit : *%limit*
β°βββββββββββββ %readmore`.trimStart(),
	header: 'β­βγ %category γ',
	body: 'β π± %cmd',
	footer: 'β°ββββ\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems }) => {
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = fs.readFileSync(`./media/picbot/menus/menus_${meh}.jpg`)
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role } = global.db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let uptime = runtime(process.uptime())
		let osuptime = runtime(os.uptime())
		let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
				tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
				prefix: 'customPrefix' in plugin,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of help)
			if (plugin && 'tags' in plugin)
				for (let tag of plugin.tags)
					if (!(tag in tags) && tag) tags[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tags).map(tag => {
				return header.replace(/%category/g, tags[tag]) + '\n' + [
					...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
						return menu.help.map(help => {
							return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
								.replace(/%islimit/g, menu.limit ? '(Limit)' : '')
								.replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
		].join('\n')
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p, uptime, osuptime,
			me: conn.getName(conn.user.jid),
			github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
			limit, name, role,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		conn.sendButton(m.chat, text.trim(), packname + ' - ' + author, nais, [
			[`π₯ Owner`, `.owner`],
			[`HBMods`, `.hbmods`]
		], m)
	} catch (e) {
		conn.reply(m.chat, 'Sorry, the menu is in error', m)
		throw e
	}
}
handler.command = /^(helpall|allhelp|allm(enu)?|m(enu)?all|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
	let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
	let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
	let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
	return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
