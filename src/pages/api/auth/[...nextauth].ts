import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '@/lib/spotify'
import { JWT } from "next-auth/jwt"
import { AuthOptions} from 'next-auth/core/types'

async function refreshAccessToken(token : JWT){
    try {

        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
        console.log("REFRESHED TOKEN: ", refreshedToken)

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
            //use if exsist or use old one
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export const authOptions : AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user}) {

        //initial signIn
        if(account && user){
            return {
                ...token,
                accessToken: account.access_token || '',
                refreshToken: account.refresh_token || '',
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at? account.expires_at* 1000 : 0,

            }
        }

        // Return previous token if the access token has not expipred yet
        if(Date.now() < token.accessTokenExpires){
            console.log("Existing Access Token is Valid")
            return token
        }

        //get new access token when expired
        console.log("ACCESS TOKEN HAS BEEN EXPIRED, REFRESHING...")
        return await refreshAccessToken(token)
    },

    async session({ session, token }) {

        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username

        return session

    }
  }
}

export default NextAuth( authOptions)