"use client"

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

// header with sign out button
function Header() {
    const { data : session } = useSession()
  return (
    <header className="absolute top-5 right-8">
      <div onClick={() => signOut()} className="flex items-center bg-black text-white cursor-pointer space-x-3 opacity-90 hover:opacity-80 rounded-full p-1 pr-2">
        <Image className="rounded-full w-10 h-10" src={session?.user.image || ''} width="20" height="20" alt="header image"></Image>
        <h2>{session?.user.name}</h2>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
    </header>
  )
}

export default Header