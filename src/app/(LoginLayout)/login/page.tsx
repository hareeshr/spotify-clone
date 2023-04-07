import { getProviders } from 'next-auth/react'
import LoginButton from '@/components/LoginButton'
import Image from 'next/image'

// sign in page
export default async function Login(  ) {
    const providers = await getProviders()
    
    return (
      
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <Image className="w-52 mb-5" width="52" height="52" src="https://cdn.cdnlogo.com/logos/s/89/spotify.svg" alt="Spotify Logo" />
            {providers && Object.values(providers).map((provider) => (
                <LoginButton provider={provider} key={provider.name}/>
            ))}
        </div> 
      
    )
}