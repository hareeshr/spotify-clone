import { atom } from 'recoil'

//list of Playlist state
export const listPlaylistsState = atom<SpotifyApi.PlaylistObjectSimplified[]>({
    key: "listPlaylistsState",
    default: []
})

//Playlist state
export const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
    key: "playlistState",
    default: null
})

//Active playlist Id state
export const playlistIdState = atom({
    key: "playlistIdState",
    default: ''
})