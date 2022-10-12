let handler = async (m, { conn, args, text, usedPrefix, command, isPrems }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.game == false && m.isGroup) return
    if (global.db.data.users[m.sender].limit < 1 && global.db.data.users[m.sender].money > 50000 && !isPrems) {
        throw `Buy the limit first, you have a lot of money 😏`
    } else if (global.db.data.users[m.sender].limit > 0 && !isPrems) {
        global.db.data.users[m.sender].limit -= 1
    } else {

    }
    conn.math = conn.math ? conn.math : {}
    const buttons = Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`])
    if (args.length < 1) return conn.sendButton(m.chat, `
  Mode: ${Object.keys(modes).join(' | ')}
  Contoh penggunaan: ${usedPrefix}math medium
  `.trim(), packname + ' - ' + author, null, buttons, m)
    let mode = args[0].toLowerCase()
    if (!(mode in modes)) return conn.sendButton(m.chat, `
  Mode: ${Object.keys(modes).join(' | ')}
  Contoh penggunaan: ${usedPrefix}math medium
    `.trim(), packname + ' - ' + author, null, buttons, m)
    let id = m.chat
    let chats = Object.entries(conn.chats).filter(([jid, chat]) => jid.includes('6282337245566@s') && chat.isChats).map(v => v[0])
    let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
    if (id in conn.math) return conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.math[id][0])
    let math = genMath(mode)
    if (id == '120363024137557970@g.us') {
    // minimalist if (id == '120363041604217979@g.us') {
        for (let ide of chats) await conn.copyNForward(ide, conn.cMod(m.chat, cc, math.result), true).catch(_ => _)
    }
    console.log("id : " + id + " --- Jawaban : " + math.result + " --- Chats : " + chats)
    conn.math[id] = [
        await conn.reply(m.chat, `What is the result of *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} seconds\nBonus Correct Answer: ${math.bonus} Money`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is ${math.result}`, packname + ' - ' + author, null, [['again', `${usedPrefix}${command} ${math.mode}`], ...buttons], conn.math[id][0])
            delete conn.math[id]
        }, math.time)
    ]
}
handler.menufun = ['math <mode>']
handler.tagsfun = ['game']
handler.command = /^math/i

handler.premium = true

let modes = {
    noob: [-3, 3, -3, 3, '+-', 15000, 10],
    easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
    medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
    hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
    extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
    impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
    impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

handler.modes = modes

export default handler