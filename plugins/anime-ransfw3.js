import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let fimg = await fetch(`https://api.lolhuman.xyz/api/random2/${command}?apikey=${global.api}`)
        //if (!fimg.ok) throw `Fitur Error!`
        let fimgb = Buffer.from(await fimg.arrayBuffer())
        conn.sendButton(m.chat, `_Random pic: ${command}_`, packname + ' - ' + author, fimgb, [[`⧑ next ${command} ⧑`, `${usedPrefix + command} ${text}`]], m)
    } catch (e) {
        console.log(e)
        m.reply(`An error occurred, try again later`)
    }
}
handler.menuanime = ['holo','kemonomimi','fox_girl']
handler.tagsanime = ['randompic']
handler.command = /^(holo|kemonomimi|fox_girl)$/i

handler.premium = true
handler.limit = true

export default handler