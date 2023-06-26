
# Spotify Clone

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Deploy](#deploy)
- [Run Locally](#run-locally)
- [Contact](#contact)

## Overview

This project is a clone of the popular music streaming service Spotify. The goal of this project is to create a web application that can view and play your Playlists from Spotify and control the playback on Spotify. The project will consist of a homepage that shows your Playlists, and a Playlist page with the list of Tracks in it. Users can sign in with Spotify to facilitate the features.

[Demo Link](https://spot-clone.hareeshr.me/)

### Built With

 - [Next.js](https://nextjs.org/)
 - [React.js](https://react.dev/)
 - [Typescript](https://www.typescriptlang.org/)
 - [Node.js](https://nodejs.org/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [NextAuth.js](https://next-auth.js.org/)
 - [Recoil](https://recoiljs.org/)
 - [Spotify API](https://developer.spotify.com/)

## Features

 - Authentication using Spotify Account
 - Homepage with your Playlists to choose from
 - Playlist page with tracks from your playlist
 - Full controls for playback including play, pause, volume controls, skip and rewind.
 - Use the selected model to generate responses to the given prompts from OpenAI API

## Prerequisites

 - Get your Spotify API key from [here](https://developer.spotify.com/dashboard).
 - Spotify Premium account - keep it logged in for the app to work
 - Git -  [Download & Install Git](https://git-scm.com/downloads) for Windows users. (OSX and Linux machines has it preinstalled).
 - Node.js -  [Download & Install Node.js](https://nodejs.org/en/download/).

## Deploy

**Vercel**
Host your own live version of Chatbot UI with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhareeshr%2Fspotify-clone&env=NEXTAUTH_URL,SPOTIFY_CLIENT_SECRET,SPOTIFY_CLIENT_ID,NEXTAUTH_SECRET&demo-title=Spotify%20Clone&demo-description=A%20functional%20Spotify%20clone&demo-url=https%3A%2F%2Fspot-clone.hareeshr.me%2F)
    
## Run Locally
**1. Clone Repo**

**2. Install Dependencies**

    npm i
**3. Provide API Key**
Create a .env.local file in the root of the repo with your configuration and API Keys:

    NEXTAUTH_URL=YOUR_DEPLOYMENT_URL
    SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_SECRET
    SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_ID
    NEXTAUTH_SECRET=ANY_SECRET_KEY
    
**4. Run App**

    npm run dev
    
**5. Happy chatting**
You can now login using your Spotify account and start controlling your Spotify playback

## Contact

If you have any questions, feel free to reach out to me on [hareeshr.me](https://hareeshr.me)
