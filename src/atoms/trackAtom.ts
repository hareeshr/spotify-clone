import { atom } from 'recoil'

//Current track Id state
export const currentTrackIdState = atom<string | undefined | null>({
    key: "currentTrackIdState",
    default: null,
})

//is Playing or not state
export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
})