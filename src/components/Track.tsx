import Image from 'next/image'
import useSpotify from '@/hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '@/atoms/trackAtom'
import { handleSpotifyError } from '@/lib/errorHandlers'
import { millisToMinutesAndSeconds } from '@/lib/time'

//display track row
function Track({ order, track } : { order: number, track: SpotifyApi.PlaylistTrackObject}) {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    // play track
    const playTrack = () =>{
        setCurrentTrackId(track.track?.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track?.uri ?? '']
        }).catch(err => handleSpotifyError(err))
    }

    return (
    <div onClick={playTrack} className="grid grid-cols-2 text-gray-500 text-sm lg:text-md py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
        <div className="flex items-center space-x-4">
            <p>{order + 1}</p>
            <Image className="h-10 w-10" src={track.track?.album.images[0]?.url || ''} width="100" height="100" alt="Track Cover"></Image>
            <div>
                <p className="w-36 lg:w-64 text-white truncate">{track.track?.name}</p>
                <p className="w-40">{track.track?.artists[0].name}</p>
            </div>
        </div>

        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">{track.track?.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.track?.duration_ms ?? 0)}</p>
        </div>
    </div>
  )
}

export default Track