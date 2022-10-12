let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `Use example ${usedPrefix}${command} i'm alien?`
    m.reply(`"${[
        'Maybe someday',
        'Not really',
        'Not both',
        'I do not think so',
        'Yes',
        'Try asking again'
        'There isn't any'
    ].getRandom()}."`)
}
handler.menufun = ['kerang', 'kerangajaib'].map(v => v + ' <teks>')
handler.tagsfun = ['kerang']

handler.command = /^(kulit)?kerang(ajaib)?$/i

export default handler
