"use client"

import { useEffect } from "react"
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistState, playlistIdState } from "@/atoms/playListAtom"
import Track from "./Track"
import useSpotify from "@/hooks/useSpotify"
import { handleSpotifyError } from "@/lib/errorHandlers"

function Tracks() {

    const spotifyApi = useSpotify()
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)
  
    //get playlist details by id
    useEffect(() => {
      playlistId !== '' && spotifyApi.getPlaylist(playlistId).then(data => {
        setPlaylist(data.body)
      })
      .catch(err => handleSpotifyError(err))
    },[playlistId, spotifyApi])
    
    
  return (
    <div className="px-8 flex-col space-y-1 pb-28 text-white">
        {
            playlist?.tracks?.items.map((track, i) => (
                <Track key={track.track?.id} track={track} order={i}/>
            ))
        }

    </div>
  )
}

export default Tracks