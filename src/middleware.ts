import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Token will exist if user is logged in
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    // Skip if auth path, or next files, or token is valid
    if(pathname.includes('/api/auth') || pathname.includes('/_next') || token) {
        return NextResponse.next();
    }

    // redirect if no token and requesting protected route
    if(!token && pathname !== "/login"){
        return NextResponse.redirect(process.env.NEXTAUTH_URL+"/login")
    }
    
    return NextResponse.next();
}