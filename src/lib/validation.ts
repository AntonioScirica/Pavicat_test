import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  message: z.string().min(10, 'La descrizione deve avere almeno 10 caratteri'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
