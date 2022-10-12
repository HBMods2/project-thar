let handler = async (m, { conn, command }) => {
    conn.reply(m.chat, `*「 RECODED BY HERBERT 」*

*⭔ HBWABot Version 2 ( 1 file session )*
_https://github.com//HBMods2/HBWABot-v2
`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler