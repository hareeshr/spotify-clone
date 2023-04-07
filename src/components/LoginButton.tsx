"use client"

import { signIn } from 'next-auth/react'

type Props = {
    provider: {
        id: string,
        name: string,
    }
}

function LoginButton({provider}: Props) {
  return (
    <button onClick={() => signIn(provider.id, { callbackUrl: "/"})} className="bg-[#18D860] text-white p-5 rounded-full">
        Sign in with {provider.name}
    </button>
  )
}

export default LoginButton