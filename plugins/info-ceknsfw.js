import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime)) {
		let img = await q.download?.()
		let out = await uploadImage(img)
		let res = await fetch(`https://api.lolhuman.xyz/api/nsfwcheck?apikey=${global.api}&img=${out}`)
	    let json = await res.json()
		if (json.status != '200') throw `Feature Error!
		let get_result = json.result
		let is_nsfw = 'No'
		if (Number(get_result.replace("%", "")) >= 50) is_nsfw = 'Yes'
		m.reply(`Is NSFW? *${is_nsfw}*\n\nNSFW Score : *${get_result}*`)
    } else {
    	m.reply(`Send image with caption *${use Prefix + command}* or tag image already sent`)
    }
}

handler.help = ['ceknsfw']
handler.tags = ['information']
handler.command = /^(ch?ec?k)nsfw|nsfw(ch?ec?k)$/i

handler.premium = true
handler.limit = true

export default handler