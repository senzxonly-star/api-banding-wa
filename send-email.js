const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { key, fromEmail, fromPass, to, subject, body } = req.body;

    // VALIDASI API KEY (Misal kita set key-nya: beckk001)
    if (key !== 'beckk001') {
        return res.status(401).json({ success: false, message: '🔐 API Key tidak valid!' });
    }

    // KONFIGURASI TRANSPORTER
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromEmail,
            pass: fromPass
        }
    });

    try {
        await transporter.sendMail({
            from: fromEmail,
            to: to,
            subject: subject,
            text: body
        });
        
        return res.status(200).json({ success: true, message: 'Email Berhasil Terkirim!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
