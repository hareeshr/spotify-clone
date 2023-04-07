"use client"

import { Session } from "next-auth"
import {SessionProvider as Provider } from "next-auth/react"
import { RecoilRoot } from "recoil"

type Props = {
    children: React.ReactNode
    session: Session | null
}

// handle sessionProvider and recoil state manager
export function SessionProvider({ children, session }: Props) {
    return (
        <Provider session={session}>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </Provider> 
    )
}