let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return m.reply(`_*no voting in this group!*_\n\n*${used Prefix}vote* - to start voting`)q
    delete conn.vote[id]
    m.reply(`Successfully Delete Vote Session In This Group`)

}

handler.menugroup = ['hapusvote']
handler.tagsgroup = ['group']
handler.command = /^((del(ete)?|hapus)vote)$/i

handler.group = true
handler.admin = true

export default handler 