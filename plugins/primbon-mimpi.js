import { artimimpi } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example: ${usedPrefix + command} Ular`
    try {
        let anu = await artimimpi(`${text}`)
        if (anu.length != 0) {
            let ini_txt = `*Dream meaning : ${text}*\n\n`
            for (var x of anu) {
                ini_txt += `⭔ ${x}*\n\n`
            }
            m.reply(ini_txt)
        } else {
            m.reply(`No dream interpretation found *${text}*, search with other keywords.\nExample : *${usedPrefix + command} snake*`)
        }
    } catch (e) {
        console.log(e)
        m.reply(`Feature Error!`)
    }
}

handler.help = ['artimimpi <teks>']
handler.tags = ['primbon']
handler.command = /^(tafsir|arti)mimpi$/i

handler.premium = true
handler.limit = true

export default handler