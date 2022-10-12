import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime)) {
        let img = await q.download?.()
        let out = await uploadImage(img)
        let res = await fetch(`https://api.lolhuman.xyz/api/wmit?apikey=${global.api}&img=${out}`)
        if (!res.ok) throw await `Feature Error!
        let json = await res.json()
        if (json.status != '200') throw ``A mistake is made!
        if (json.result.length == 0) throw `Failed to detect, try to source the image from the manga page.`
        let get_result = json.result
        let ini_txt = `*RESULT :*`
        for (var x of get_result) {
            ini_txt += `\n\n*Title : ${x.title}*\n`
            ini_txt += `*Part :* ${x.part}\n`
            ini_txt += `*Url :*\n`
            for (var y of x.urls) {
                ini_txt += `*-* ${y}\n`
            }
            ini_txt += `*Similarity : ${x.similarity}%*\n`
            ini_txt += `───────────────────`
        }
        m.reply(ini_txt)
    } else {
        m.reply(`Send image with caption *${use Prefix + command}* or tag image already sent`) }
}

handler.menuanime = ['wmit']
handler.tagsanime = ['search']
handler.command = /^wmit|(whatmanga)$/i

handler.premium = true
handler.limit = true

export default handler