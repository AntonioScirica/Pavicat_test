import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Il messaggio deve avere almeno 10 caratteri'),
  privacy: z.literal(true, {
    error: 'Devi accettare la privacy policy',
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
