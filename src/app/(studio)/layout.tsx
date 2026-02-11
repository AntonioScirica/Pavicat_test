export const metadata = {
  title: 'Pavicat CMS',
  description: 'Pannello di gestione contenuti Pavicat',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
