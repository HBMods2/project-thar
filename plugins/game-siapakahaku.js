import { siapakahaku } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.game == false && m.isGroup) return
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.siapakahaku[id][0])
        throw false
    }
    if (global.db.data.users[m.sender].limit < 1 && global.db.data.users[m.sender].money > 50000 && !isPrems) {
        throw `Buy the limit first, you have a lot of money 😏`
    } else if (global.db.data.users[m.sender].limit > 0 && !isPrems) {
        global.db.data.users[m.sender].limit -= 1
    } else {

    }
    const json = await siapakahaku()
    let caption = `
🎮 *Who am I* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Money
`.trim()
    conn.siapakahaku[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, packname + ' - ' + author, ['siapakahaku', `${usedPrefix}siapakahaku`], conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
    console.log(json.jawaban)
}

handler.menufun = ['siapakahaku (money+)']
handler.tagsfun = ['game']
handler.command = /^(siapa(kah)?aku)$/i

handler.premium = true

export default handler