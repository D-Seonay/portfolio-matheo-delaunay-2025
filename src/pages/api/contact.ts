// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Initialiser l'API SendGrid avec la clé API
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined in environment variables');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!process.env.SENDGRID_FROM_EMAIL || !process.env.SENDGRID_TO_EMAIL) {
    return res.status(500).json({ 
      message: 'Server configuration error: Missing SendGrid email settings' 
    });
  }

  // Créer le message
  const msg = {
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Nouveau message de ${name}: ${subject}`,
    html: `
      <h3>Nouveau message de contact</h3>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    replyTo: email, // Permet de répondre directement à l'expéditeur
  };

  try {
    // Envoyer l'email via SendGrid
    await sgMail.send(msg);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', {
      message: error.message,
      response: error.response?.body,
    });
    res.status(500).json({ 
      message: 'Error sending message',
      details: error.response?.body?.errors?.[0]?.message || error.message
    });
  }
}