let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || isNaN(text)) throw `Enter the nominal !\n\nExample : *${usedPrefix + command} 10000*`
    let awal = global.db.data.users[m.sender].money
    let awal2 = parseInt(awal) + parseInt(text)
    if (awal2 > 1000000000000000) throw `Most`
    if (initial2 < 0) throw `Do not let the balance be minus.`
    global.db.data.users[m.sender].money += parseInt(text)
    await delay(500)
    if (text.includes('-')) {
        m.reply(`You deposit ${text}\n\nBalance : ${global.db.data.users[m.sender].money}`)
    } else {
        m.reply(`Successful withdrawal of money.\n\nBalance : ${global.db.data.users[m.sender].money}`)
    }
}

handler.menugroup = ['cash <nominal>']
handler.tagsgroup = ['owner']
handler.command = /^(cash)$/i

handler.owner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))