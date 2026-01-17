const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Gunakan POST' });

    // Biar gak salah paham, kita terima 'key' atau 'apiKey'
    const { key, apiKey, fromEmail, fromPass, to, subject, body } = req.body;
    const finalKey = key || apiKey;

    // Kunci kita patenkan: sean123
    if (finalKey !== 'sean123') {
        return res.status(401).json({ success: false, message: `Key Salah! Kamu kirim: ${finalKey}` });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: fromEmail, pass: fromPass }
    });

    try {
        await transporter.sendMail({ from: fromEmail, to, subject, text: body });
        return res.status(200).json({ success: true, message: 'Berhasil' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
