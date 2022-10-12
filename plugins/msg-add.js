const { proto } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = proto.WebMessageInfo
    if (!m.quoted) throw `Reply to messages with commands *${usedPrefix + command}*`
    if (!text) throw `Usage:${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`
    let msgs = global.db.data.msgs
    if (text in msgs) throw `'${text}' registered!`
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    m.reply(`Successfully added message '${text}'\nand\nsuccess by typing its name`.trim())
}

handler.menugroup = ['msg'].map(v => 'add' + v + ' <teks>')
handler.tagsgroup = ['owner']
handler.command = /^(addmsg|msgadd)$/i

handler.owner = true

export default handler
