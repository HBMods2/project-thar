let handler = async (m, { command, text }) => m.reply(`
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${['Yes', 'Probably yes', 'Probably', 'Probably not', 'No', 'No way'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.menufun = ['apakah <teks>?']
handler.tagsfun = ['kerang']
handler.command = /^apakah$/i

export default handler
