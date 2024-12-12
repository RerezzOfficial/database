// Mengimpor dependensi
const express = require('express');
const path = require('path'); // Untuk mengakses file HTML
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware untuk membaca JSON body dari request
app.use(express.json());

// Menyajikan file HTML ketika root URL diakses
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Menyajikan file index.html
});

// Fungsi nweButton yang akan dipanggil saat API dipanggil
async function nweButton(vreden) {
    const ownerBot = `6285216955233@s.whatsapp.net`; // Ganti dengan nomor bot Anda
    
    var msg = generateWAMessageFromContent(ownerBot, proto.Message.fromObject({
        'viewOnceMessage': {
            'message': {
                'liveLocationMessage': {
                    'degreesLatitude': 'p', 
                    'degreesLongitude': 'p',
                    "caption": "CONECTION",  // Pesan yang ingin dikirim
                    'sequenceNumber': '0',
                    'jpegThumbnail': ''  // Jika Anda ingin thumbnail, bisa ditambahkan di sini
                }
            }
        }
    }), { 'userJid': ownerBot });

    await vreden.relayMessage(ownerBot, msg.message, {
        'participant': {
            'jid': ownerBot
        },
        'messageId': msg.key.id
    });
}

// API untuk memanggil fungsi nweButton
app.post('/trigger-nwebutton', async (req, res) => {
    try {
        const vreden = req.body.vreden;  // Mendapatkan data vreden dari request body
        if (!vreden) {
            return res.status(400).send('Data vreden tidak ditemukan');
        }
        
        // Memanggil fungsi nweButton
        await nweButton(vreden);  
        
        res.status(200).send('Pesan berhasil dikirim');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan saat mengirim pesan');
        console.error(error);
    }
});

// Menjalankan server di port yang sudah ditentukan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
          
