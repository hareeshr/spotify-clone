"use client"

import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "@/atoms/playListAtom"
import Image from "next/image"


//colours for ambience
const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

type Props = {
  plId: string
}

function PlaylistHeader({ plId } : Props) {

    const [color, setColor] = useState<string | undefined | null>(null)

    const playlist = useRecoilValue(playlistState)
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    //chage playlist and set random colour
    useEffect(() => {
      setColor(shuffle(colors).pop())
      if(plId !== playlistId)
        setPlaylistId(plId)
    }, [])

  return (
    <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>

      {playlist?.images?.[0]?.url && <Image src={playlist.images[0].url} className="h-44 w-44 shadow-2xl" width="100" height="100" alt="Header Image" /> }
      
      <div>
        <p>PLAYLIST</p>
        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
          {playlist?.name}
        </h1>
      </div>

    </section>
  )
}

export default PlaylistHeader