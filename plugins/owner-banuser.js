let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.quoted ? m.quoted.sender : m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag one of them'
    try {
        let users = global.db.data.users
        users[who].banned = true
        conn.reply(m.chat, `successfully banned`, m)
    } catch (e) {
        console.log(e)
        m.reply(`The user is not in the database.`)
    }
}

handler.menugroup = ['ban @tag']
handler.tagsgroup = ['owner']
handler.command = /^(ban(user)?)$/i

handler.owner = true

export default handler