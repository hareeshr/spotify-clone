import { getServerSession } from 'next-auth'
import { SessionProvider } from '@/components/SessionProvider'
import ClientProvider from '@/components/ClientProvider'
import Player from '@/components/Player'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import '@/styles/globals.css'

export const metadata = {
  title: 'Spotify Clone',
  description: 'Created by Hareesh Ramachandran',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>

          {/* header with signout */}
          <Header></Header>

          {/* Main section */}
          <div className="bg-black h-screen overflow-hidden">
            <main className="flex">
                <Sidebar />
                { children }
            </main>

            {/* Player section */}
            <div className="sticky bottom-0">
              <Player />
            </div>
            
            {/*Client Provider for Notification*/}
            <ClientProvider />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}