import { tebaklirik } from '@bochilteam/scraper'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.game == false && m.isGroup) return
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (id in conn.tebaklirik) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.tebaklirik[id][0])
        throw false
    }
    if (global.db.data.users[m.sender].limit < 1 && global.db.data.users[m.sender].money > 50000 && !isPrems) {
        throw `Buy the limit first, you have a lot of money`
    } else if (global.db.data.users[m.sender].limit > 0 && !isPrems) {
        global.db.data.users[m.sender].limit -= 1
    } else {

    }
    const json = await tebaklirik()
    let caption = `
🎮 *Tebak Lirik* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
    conn.tebaklirik[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklirik[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is*${json.jawaban}*`, packname + ' - ' + author, ['tebaklirik', `${usedPrefix}tebaklirik`], conn.tebaklirik[id][0])
            delete conn.tebaklirik[id]
        }, timeout)
    ]
    console.log(json.jawaban)
}

handler.menufun = ['tebaklirik (exp+)']
handler.tagsfun = ['game']
handler.command = /^(tebaklirik)$/i

handler.premium = true

export default handler