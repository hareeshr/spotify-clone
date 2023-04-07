import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast"

//spotifyApi
export const handleSpotifyError = (err : SpotifyApi.ErrorObject) => {
    //if not premium account
    if(err.message.includes('PREMIUM_REQUIRED'))
        toast('Spotify Premium account is required')
    else if(err.message.includes('access token expired'))
        signIn()
}