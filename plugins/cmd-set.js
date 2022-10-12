let handler = async (m, { text, usedPrefix, command }) => {
    db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw `Reply sticker with command*${usedPrefix + command}*`
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`
    let sticker = db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw 'You do not have permission to modify this sticker order'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`Berhasil!`)
}

handler.menugroup = ['cmdset']
handler.tagsgroup = ['owner']
handler.command = /^((set|add)cmd|cmd(set|add))$/i

handler.owner = true

export default handler