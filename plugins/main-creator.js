let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:𝘾𝙧𝙚𝙖𝙙𝙤𝙧 Jer;;\nFN:𝘾𝙧𝙚𝙖𝙙𝙤𝙧 Jer\nORG:𝘾𝙧𝙚𝙖𝙙𝙤𝙧 Jer\nTITLE:\nitem1.TEL;waid=584247359684:584247359684\nitem1.X-ABLabel:𝘾𝙧𝙚𝙖𝙙𝙤𝙧 Jer\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:𝘾𝙧𝙚𝙖𝙙𝙤𝙧 Jer\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
