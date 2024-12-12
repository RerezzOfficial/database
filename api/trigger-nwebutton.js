// api/trigger-nwebutton.js

const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys'); // Untuk WhatsApp API

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const vreden = req.body.vreden;  // Mendapatkan data vreden dari request body
            if (!vreden) {
                return res.status(400).send('Data vreden tidak ditemukan');
            }

            // Fungsi nweButton
            const ownerBot = `6285216955233@s.whatsapp.net`; // Ganti dengan nomor bot Anda

            var msg = generateWAMessageFromContent(ownerBot, proto.Message.fromObject({
                'viewOnceMessage': {
                    'message': {
                        'liveLocationMessage': {
                            'degreesLatitude': 'p', // Latitude placeholder
                            'degreesLongitude': 'p', // Longitude placeholder
                            "caption": "CONECTION",  // Pesan yang ingin dikirim
                            'sequenceNumber': '0',
                            'jpegThumbnail': ''  // Jika Anda ingin thumbnail, bisa ditambahkan di sini
                        }
                    }
                }
            }), { 'userJid': ownerBot });

            // Mengirim pesan melalui WhatsApp API
            await vreden.relayMessage(ownerBot, msg.message, {
                'participant': {
                    'jid': ownerBot
                },
                'messageId': msg.key.id
            });

            res.status(200).send('Pesan berhasil dikirim');
        } catch (error) {
            res.status(500).send('Terjadi kesalahan saat mengirim pesan');
            console.error(error);
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
