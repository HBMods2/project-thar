//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);

let handler = async (m, { conn, command }) => {
	let ini_txt = `β€βπ©Ή *[ Chat With Creator ]*
wa.me/918416093546

ββ£ *PREMIUM USER*
β β’ Infinity Limit
β β’ Full Private Chat
ββββ£ *Harga :* Rp.10.000 / bulan

ββ£ *JASA RUN BOT*
β β’ Nebeng Run SC Via RDP
β β’ SC wajib *plugin*, bukan case
ββββ£ *Harga :* Rp.20.000 / bulan

ββ£ *JADI BOT*
β β’ Jadi Bot Azami Always ON
β β’ Custom Namabot, Owner, rules, dll.
β β’ Bisa Req Tampilan atau Fitur
ββββ£ *Harga :* Rp.25.000 / bulan

- Pembayaran via *OVO / Dana / GoPay*
  *( tidak ada opsi lain )*
  ke nomor 082337245566
- Whatsapp Multi Device
- Run via RDP (Always ON)
- Request Fitur? *Chat Link Creator di atas.*`
	//m.reply(ini_txt)
	command = command.toLowerCase()
	conn.relayMessage(m.chat,  {
		requestPaymentMessage: {
			currencyCodeIso4217: 'USD',
			amount1000: command.includes('prem') ? '0670' : command.includes('sewa') ? 1010 : 1680,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: ini_txt,
					contextInfo: {
						mentionedJid: [m.sender],
						externalAdReply: {
							showAdAttribution: true
						}
					}
				}
			}
		}
	}, {})
	
	/*const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require("@adiwajshing/baileys")
	let fs = require('fs')
	var messa = await prepareWAMessageMedia({ image: fs.readFileSync('./media/anime.jpg') }, { upload: conn.waUploadToServer })
	var catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
		"productMessage": {
			"product": {
				"productImage": messa.imageMessage,
				"productId": "5838766206142201",
				"title": `Sewa Bot`,
				"description": `gaktau`,
				"currencyCode": "IDR",
				"bodyText": `gaktaukalo`,
				"footerText": `koncol`,
				"priceAmount1000": "15000000",
				"productImageCount": 100,
				"firstImageId": 1,
				"salePriceAmount1000": "15000000",
				"retailerId": `κͺΆππ«ππ§π³πππ¦π©ππ§π³βΏ»κ«`,
				"url": "wa.me/6282337245566"
			},
			"businessOwnerJid": "6282337245566@s.whatsapp.net",
		}
	}), { userJid: m.chat, quoted: m })
	conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })*/
}

handler.menugroup = ['jadixxxbot']
handler.tagsgroup = ['grxxoup']
handler.command = /^(jadibot)$/i

export default handler