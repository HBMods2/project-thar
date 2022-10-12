import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example: ${usedPrefix + command} Soekarno is`
    let res = await fetch(`https://api.lolhuman.xyz/api/brainly?apikey=${global.api}&query=${encodeURIComponent(text)}`)
    if (!res.ok) throw `Information not available / error feature.`
    let json = await res.json()
    if (json.status != '200') throw `Information not available.`
    let get_result = json.result
    let ini_txt = "*Result :*"
    for (var x of get_result) {
        ini_txt += `\n\n*Question :*\n${x.question.content}\n`
        ini_txt += `*Answer :*\n${x.answer[0].content}\n`
        ini_txt += `───────────────────`
    }
    m.reply(ini_txt)
}

handler.help = ['brainly <teks>']
handler.tags = ['information']
handler.command = /^brainly?$/i

handler.premium = true
handler.limit = true

export default handler