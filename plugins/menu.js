import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
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
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

let tagsm = {}
const defaultMenu = {
	before: `%name!

β¦Ώ π§± Limit : *%limit Limit*
β¦Ώ π¦ΈπΌββοΈ Role : *%role*
β¦Ώ πΌ Level : *%level (%exp / %maxexp)*
β¦Ώ π΅ Money : *%money*
β¦Ώ π« Total XP : %totalexp β¨

β¦Ώ π Database : %totalreg User
β¦Ώ π Runtime : *%uptime*

#OS Version : %osversion#
#OS Arch : %osarch | %oscore Core | %osspeed#
#OS Uptime : %osuptime#

Claim *.daily* or play games on *.fun menu* to get exp / money_
`.trimStart(),
	header: 'β­βγ %category γ',
	body: 'β π± %cmd %islimit %isPremium',
	footer: 'β°ββββ\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, usedPrefix, command }) => {
	try {
		let jam = new Date().getHours()
		let meh = padLead(ranNumb(43), 3)
		//let meh2 = ranNumb(2)
		let meh2 = 2
		let nais = fs.readFileSync(`./media/picbot/menus/menus_${meh}.jpg`)
		let { exp, money, limit, level, role } = global.db.data.users[m.sender]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let uptime = runtime(process.uptime()).trim()
		let osarch = os.arch()
		let oscpu = os.cpus().slice(0,1).map(v => v.model.split('@')[0].replace(' CPU','').replace('Intel(R) ','').trim())
		let osspeed = os.cpus().slice(0,1).map(v => v.model.split('@')[1])
		let oscore = os.cpus().length
		let osversion = os.version().split(/single|datacenter/gi)[0].trim()
		let osrelease = os.release()
		let osuptime = runtime(os.uptime()).trim()
		let totalreg = Object.keys(global.db.data.users).length
		let helpm = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				helpm: Array.isArray(plugin.tagsm) ? plugin.helpm : [plugin.helpm],
				tagsm: Array.isArray(plugin.tagsm) ? plugin.tagsm : [plugin.tagsm],
				prefix: 'customPrefix' in plugin,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of helpm)
			if (plugin && 'tagsm' in plugin)
				for (let tag of plugin.tagsm)
					if (!(tag in tagsm) && tag) tagsm[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`).replace(`%name!`, `${jam < 4 ? `*Hello %name!, π it's early in the morning*` : jam < 11 ? `*π Good Morning %name!*` : jam < 14 ? `*βοΈ Good Afternoon %name!*` : jam < 18 ? `*π Good Evening %name!*` : `*Hello %name!, π Good Night*`}`),
			...Object.keys(tagsm).map(tag => {
				return header.replace(/%category/g, tagsm[tag]) + '\n' + [
					...helpm.filter(menu => menu.tagsm && menu.tagsm.includes(tag) && menu.helpm).map(menu => {
						return menu.helpm.map(helpm => {
							return body.replace(/%cmd/g, menu.prefix ? helpm : '%p' + helpm)
								.replace(/%islimit/g, menu.limit ? '(Limit)' : '')
								.replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p, uptime, osuptime, osarch, oscpu, osspeed, oscore, osrelease, osversion,
			me: conn.getName(conn.user.jid),
			exp: exp - min,
			money: money,
			maxexp: xp,
			totalexp: exp,
			xp4levelup: max - exp,
			level, limit, name, totalreg, role,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		if (meh2 == 1) {
			conn.sendHydrated(m.chat, text.replaceAll('#','```').trim(), packname + ' - ' + author, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist γ Sweet', null, null, [
				['Premium', '.premium'],
				['Contact', '.owner'],
				['β¦Ώ ALL MENU β¦Ώ', '.menuall']
			], m)
		} else {
			if (!args[0]) {
				const sections = [
					{
						title: `β β β β γ MAIN γ β β β β`,
						rows: [
							{title: 'β‘ PREMIUM', rowId: usedPrefix + 'sewa', description: 'Premium, Donate'},
							{title: 'π« OWNER', rowId: usedPrefix + 'owner', description: 'Chat P not replying'},
							{title: 'π Script', rowId: usedPrefix + 'sc', description: 'Original Base'}
						]
					}, {
						title: `β β β β γ SUB MENU γ β β β β`,
						rows: [
							{title: 'πͺ ALL MENU', rowId: usedPrefix + 'menuall', description: 'β Show All Menu'},
							{title: 'π ANIME', rowId: usedPrefix + 'menuanime', description: 'β Cari Manga, Anime, Random Pic'},
							{title: 'β DOWNLOAD', rowId: usedPrefix + 'menudownload',  description: 'β Youtube, Facebook, Tiktok, Dll...'},
							{title: 'π? GAMES & FUN', rowId: usedPrefix + 'menufun', description: 'β RPG, Quiz, Anonymous'},
							{title: 'π³ GENSHIN IMPACT', rowId: usedPrefix + 'menugenshin', description: 'β genshin.dev API'},
							{title: 'π NSFW', rowId: usedPrefix + 'menunsfw', description: 'β This Afakah Feature ?'},
							{title: 'π₯ GROUP', rowId: usedPrefix + 'menugroup', description: 'β Commands In Group'},
							{title: 'πΊ EDITOR', rowId: usedPrefix + 'menueditor',  description: 'β Kreasi Foto'},
							{title: 'π« EPHOTO 360', rowId: usedPrefix + 'menuephoto', description: 'β¦Ώ Edit Your Photo'},
							{title: 'πΌπ» PHOTO OXY', rowId: usedPrefix + 'menuoxy', description: 'β Edit Photos by Oxy'},
							{title: 'π¨ TEXT PRO ME', rowId: usedPrefix + 'menutextpro', description: 'β Effect Text Creation'},
						]
					}, {
						title: `β β β β γ MISC γ β β β β`,
						rows: [
							{title: 'π PING', rowId: usedPrefix + 'ping'},
							{title: 'π SPEEDTEST', rowId: usedPrefix + 'speedtest'},
							{title: 'HBMods APK', rowId: usedPrefix + 'hbmods'},
						]
					}
				]
				const listMessage = {
					text: text.replaceAll('#','```').trim(),
					footer: packname + ' - ' + author,
					//title: `ββββγ ${packname} γββββ`,
					buttonText: `SUB MENU π«`,
					sections
				}
				await conn.sendMessage(m.chat, listMessage, {quoted: ftrol})
			}
		}
	} catch (e) {
		conn.reply(m.chat, 'Sorry, the menu is in error', m)
		throw e
	}
}
handler.command = /^((m(enu)?|help)(list)?|\?)$/i

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
