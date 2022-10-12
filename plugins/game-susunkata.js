import { susunkata } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.game == false && m.isGroup) return
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.susunkata[id][0])
        throw false
    }
    if (global.db.data.users[m.sender].limit < 1 && global.db.data.users[m.sender].money > 50000 && !isPrems) {
        throw `Buy the limit first, you have a lot of money 😏`
    } else if (global.db.data.users[m.sender].limit > 0 && !isPrems) {
        global.db.data.users[m.sender].limit -= 1
    } else {

    }
    const json = await susunkata()
    let caption = `
🎮 *Arrange Words* 🎮

Soal : ${json.soal}
Tipe : ${json.tipe}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Money
`.trim()
    conn.susunkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, packname + ' - ' + author, ['susunkata', `${usedPrefix}susunkata`], conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
    console.log(json.jawaban)
}

handler.menufun = ['susunkata (money+)']
handler.tagsfun = ['game']
handler.command = /^(susunkata)$/i

handler.premium = true

export default handler