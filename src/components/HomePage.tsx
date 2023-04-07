"use client"

import Image from "next/image"
import Link from "next/link"
import { useRecoilState, useRecoilValue } from "recoil"
import { listPlaylistsState, playlistIdState } from "@/atoms/playListAtom"

function HomePage() {

    const playlists= useRecoilValue(listPlaylistsState)
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    
  return (
    <div>
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide px-8 pt-20 pb-32 text-white">
            {/* playlists list */}
            <h2 className="text-2xl font-bold pb-5">My Playlists</h2>
            <div className="flex flex-wrap gap-[20px]">
                {playlists && playlists.map(playlist => (
                    <Link 
                        className={`flex flex-col p-[30px] justify-center hover:bg-gray-900 rounded-lg ${(playlistId == playlist.id) && "bg-gray-600/10 text-white"}`}
                        onClick={() => setPlaylistId(playlist.id)}
                        href={`/playlist/${playlist.id}`} key={playlist.id} 
                        >
                        <Image
                            className="w-[150px]"
                            src={playlist.images?.[0]?.url} width="150" height="150" alt={playlist.name}/>
                        <p className="pt-5">{playlist.name}</p>
                        <p className="pt-1 text-sm text-gray-500">By {playlist.owner.display_name}</p>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage