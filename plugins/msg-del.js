let handler = async (m, { command, usedPrefix, text }) => {
    if (!text) throw `Use *${usedPrefix}listmsg* to see the list`
    let msgs = global.db.data.msgs
    if (!(text in msgs)) throw `'${text}' not registered in message list`
    delete msgs[text]
    m.reply(`Successfully deleted message in message list with name '${text}'`)
}

handler.menugroup = ['msg'].map(v => 'del' + v + ' <teks>')
handler.tagsgroup = ['owner']
handler.command = /^(delmsg|msgdel)$/i

handler.owner = true

export default handler
