"use client"

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { listPlaylistsState, playlistIdState } from '@/atoms/playListAtom'
import Image from 'next/image'
import Link from "next/link"
import useSpotify from '@/hooks/useSpotify'
import { handleSpotifyError } from '@/lib/errorHandlers'
import { HomeIcon, BuildingLibraryIcon} from '@heroicons/react/24/outline'

//sidebar navigation
function Sidebar() {
  const spotifyApi = useSpotify()
  const { data : session, status } = useSession()
  const [playlists, setPlaylists] = useRecoilState(listPlaylistsState)
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
      if(spotifyApi.getAccessToken()){
        spotifyApi.getUserPlaylists().then((data) => {
          setPlaylists(data.body.items)
        }).catch(err => handleSpotifyError(err))
      }
  }, [session, spotifyApi])

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-32
    ">

      <div className="space-y-3 overflow-y-scroll scrollbar-hide">
        
        <Link href="/">
          <Image className="w-full pb-2" src="https://cdn.cdnlogo.com/logos/s/1/spotify.svg" width="32" height="32" alt="Spotify Logo" />
        </Link>
        <Link href="/" className="sidebarButton">
          <HomeIcon className="h-5 w-5"></HomeIcon>
          <p>Home</p>
        </Link>

        <hr className="border-t-[0.1px] border-gray-900"/>
        
        <Link href="/" className="sidebarButton">
          <BuildingLibraryIcon className="h-5 w-5"></BuildingLibraryIcon>
          <p>Your Library</p>
        </Link>

        <hr className="border-t-[0.1px] border-gray-900"/>
        {/* playlists list */}
        {
          playlists && playlists.map(playlist => (
            <Link 
              href={`/playlist/${playlist.id}`} 
              onClick={() => setPlaylistId(playlist.id)}
              key={playlist.id} className={`flex p-[5px_10px] hover:bg-gray-900 rounded-lg hover:text-white ${(playlistId == playlist.id) && "bg-gray-600/10 text-white"}`}>
              <p>
                {playlist.name}
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar