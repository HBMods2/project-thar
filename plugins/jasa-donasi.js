let handler =  m => m.reply(`
╭─「 *HBMods Store* 」
│ *◉Base:* https://herbert70.blogspot.com/
├ GBWhatsApp Last
├ https://herbert70.blogspot.com/2022/04/download-gbwhatsapp-last-version-update.html
│
├ Instagram Pro
├ https://herbert70.blogspot.com/2022/07/instagram-pro.html
│
├ YouTube Pro
├ https://herbert70.blogspot.com/2022/07/youtube-pro.html
│
╰───「 ${packname} 」
`.trim()) // download yourself if you want

handler.menugroup = ['hbmods']
handler.tagsgroup = ['group']
handler.command = /^(dona(te|si))$/i

export default handler