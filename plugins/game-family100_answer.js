import similarity from 'similarity'
const threshold = 0.72 // semakin tinggi nilai, semakin mirip

export async function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.banned) return null
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (!(id in this.game))
        return !0
    let room = this.game[id]
    let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
    if (!isSurrender) {
        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => similarity(jawaban, text))) >= threshold)
                m.reply('A little more!')
            return !0
        }
        if (room.terjawab[index])
            return !0
        room.terjawab[index] = m.sender
        user.money += room.winScore
    }
    let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
    let caption = `
*Soal:* ${room.soal}
Terdapat *${room.jawaban.length}* jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
` : ''}
${isWin ? `*ALL ANSWERS*` : isSurrender ? '*SURRENDER!*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
        return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
    }).filter(v => v).join('\n')}
${isSurrender ? '' : `+${room.winScore} Money for every correct answer`}
    `.trim()
    const msg = await this.sendButton(m.chat, caption, packname + ' - ' + author, null, [[`${(isWin || isSurrender) ? 'Family 100' : 'Nyerah'}`, `${(isWin || isSurrender) ? '.family100' : 'nyerah'}`]], null, {
        mentions: this.parseMention(caption)
    })
    room.msg = msg
    if (isWin || isSurrender)
        delete this.game[id]
    return !0
}