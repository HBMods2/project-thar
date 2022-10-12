let handler = async (m) => m.reply(`
*Pertanyaan:* ${m.text}
*Jawaban:* ${['Yes', 'Probably yes', 'Probably', 'Probably not', 'No', 'No way'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.menufun = ['apakah <teks>?']
handler.tagsfun = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^apakah$/i

export default handler
