import '@/styles/globals.css'

export const metadata = {
  title: 'Spotify Clone Login',
  description: 'Created by Hareesh Ramachandran',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  )
}