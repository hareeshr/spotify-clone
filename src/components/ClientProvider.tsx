"use client"

import { Toaster } from "react-hot-toast"

//Client Provider for Notifications
function ClientProvider() {
  return (
    <>
        <Toaster position="bottom-right" />
    </>
  )
}

export default ClientProvider