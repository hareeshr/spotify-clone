import PlaylistHeader from "@/components/PlaylistHeader"

export default async function RootLayout({
  children, params: {id}
}: {
  children: React.ReactNode,
  params: {
    id : string
  }
}) {
  
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">

        {/* show playlist header */}
        <PlaylistHeader plId={id}></PlaylistHeader>

        {/* show all tracks */}
        <div>
          { children }
        </div>
    </div>
  )
}