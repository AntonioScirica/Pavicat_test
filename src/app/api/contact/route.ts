import { NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { contactFormSchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = result.data

    const { error } = await getResend().emails.send({
      from: 'Pavicat <noreply@pavicat.it>',
      to: process.env.CONTACT_EMAIL_TO || 'info@pavicat.it',
      replyTo: email,
      subject: `Nuovo messaggio da ${name} - Pavicat`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 10px;">
            Nuovo messaggio dal sito Pavicat
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #374151; width: 120px; vertical-align: top;">Nome:</td>
              <td style="padding: 10px; color: #4b5563;">${name}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; font-weight: bold; color: #374151; vertical-align: top;">Email:</td>
              <td style="padding: 10px; color: #4b5563;">
                <a href="mailto:${email}" style="color: #1d4ed8;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #374151; vertical-align: top;">Telefono:</td>
              <td style="padding: 10px; color: #4b5563;">
                <a href="tel:${phone}" style="color: #1d4ed8;">${phone}</a>
              </td>
            </tr>` : ''}
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; font-weight: bold; color: #374151; vertical-align: top;">Messaggio:</td>
              <td style="padding: 10px; color: #4b5563; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">
            Questo messaggio è stato inviato tramite il form di contatto del sito pavicat.it
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Errore durante l\'invio dell\'email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}
