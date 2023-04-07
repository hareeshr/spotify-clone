import { currentTrackIdState } from "@/atoms/trackAtom";
import useSpotify from "./useSpotify";
import { useRecoilValue } from 'recoil'
import { useEffect, useState } from "react";


function useTrackInfo() {

    const spotifyApi = useSpotify();
    const currentTrack = useRecoilValue(currentTrackIdState);
    const [trackInfo, setTrackInfo] = useState<SpotifyApi.TrackObjectFull | null>(null)

    useEffect(() => {
        const fetchTrackinfo = async () => {
            if(currentTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json())

                setTrackInfo(trackInfo);
            }
        }

        fetchTrackinfo();
        
    },[currentTrack, spotifyApi])
    
  return trackInfo
}

export default useTrackInfo