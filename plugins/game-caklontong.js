import { caklontong } from '@bochilteam/scraper'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.game == false && m.isGroup) return
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.caklontong[id][0])
        throw false
    }
    if (global.db.data.users[m.sender].limit < 1 && global.db.data.users[m.sender].money > 50000 && !isPrems) {
        throw `Buy the limit first, you have a lot of money 😏`
    } else if (global.db.data.users[m.sender].limit > 0 && !isPrems) {
        global.db.data.users[m.sender].limit -= 1
    } else {

    }
    const json = await caklontong()
    let caption = `
🎮 *Cak Lontong* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
    conn.caklontong[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.caklontong[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*\n${json.deskripsi}`, packname + ' - ' + author, ['caklontong', `${usedPrefix}caklontong`], conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
    console.log(json.jawaban)
}

handler.menufun = ['caklontong (exp+)']
handler.tagsfun = ['game']
handler.command = /^(caklontong)$/i

handler.premium = true

export default handler