"use client"

import { useSession } from "next-auth/react"
import { useRecoilState } from 'recoil'
import { debounce } from "lodash"
import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom"
import Image from "next/image"
import useTrackInfo from "@/hooks/useTrackInfo"
import useSpotify from "@/hooks/useSpotify"
import { ArrowsRightLeftIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline"
import {  ArrowUturnLeftIcon, BackwardIcon, ForwardIcon, MusicalNoteIcon, PlayCircleIcon } from "@heroicons/react/24/solid"
import { useCallback, useEffect, useState } from "react"
import { handleSpotifyError } from '@/lib/errorHandlers'

//player section
function Player() {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const trackInfo = useTrackInfo()

    // handle play or pause based on the isPlaying state
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if( data.body?.is_playing ) {
                spotifyApi.pause().catch(err => handleSpotifyError(err))
                setIsPlaying(false)
            }else {
                spotifyApi.play().catch(err => handleSpotifyError(err))
                setIsPlaying(true)
            }
        }).catch(err => handleSpotifyError(err))
    }

    // fetch currentTrack that is playing on Spotify
    const fetchCurrentTrack = () => {
        if(!trackInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {

                setCurrentTrackId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing)
                }).catch(err => handleSpotifyError(err))
            }).catch(err => handleSpotifyError(err))
        }
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId) {
            //fetch the current track
            fetchCurrentTrack()
        }
    }, [currentTrackId, spotifyApi, session])

    //adjust volume by debounce delay
    const deboucedAdjustVolume = useCallback(
        debounce(volume => {
            spotifyApi.setVolume(volume).catch(err => handleSpotifyError(err))
        }, 500),
        []
    )

    useEffect(() => {
        if(volume >= 0 && volume <= 100){
            deboucedAdjustVolume(volume)
        }
    },[volume])

  return (
    <div className="grid h-24 bg-gradient-to-b from-black to-gray-900 text-white grid-cols-3 text-xs md:text-base px-2 md:px-8">
        {/* left */}
        <div className="flex items-center space-x-4">
            {
                trackInfo?.album?.images?.[0]?.url ?
                    <Image className="hidden md:inline h-10 w-10" src={trackInfo?.album?.images?.[0]?.url ?? ''} width="32" height="32" alt="track cover"/>
                : <MusicalNoteIcon className="hidden md:inline h-10 w-10"/>
            }
            <div>
                <h3>{trackInfo?.name}</h3>
                <p>{trackInfo?.artists?.[0]?.name}</p>
            </div>
        </div>

        {/* center */}
        <div className="flex items-center justify-evenly">
            <ArrowsRightLeftIcon className="controlButton" />
            <BackwardIcon onClick={() => spotifyApi.skipToPrevious().catch(err => handleSpotifyError(err))} className="controlButton" />
            {
                isPlaying ? (
                    <PauseIcon onClick={() => handlePlayPause()} className="controlButton w-10 h-10" />
                ) : (
                    <PlayCircleIcon onClick={handlePlayPause} className="controlButton w-10 h-10" />
                )
            }
            <ForwardIcon onClick={() => spotifyApi.skipToNext().catch(err => handleSpotifyError(err))} className="controlButton" />
            <ArrowUturnLeftIcon className="controlButton" />
        </div>


        {/* right */}
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <SpeakerXMarkIcon onClick={() => volume > 0 && setVolume(Math.max(0,volume-10))} className="controlButton" />
            <input className="w-14 md:w-20" onChange={(e) => setVolume(Number(e.target.value))} type="range" value={volume} min={0} max={100} />
            <SpeakerWaveIcon onClick={() => volume < 100 && setVolume(Math.min(100,volume+10))} className="controlButton" />
        </div>
    </div>
  )
}

export default Player