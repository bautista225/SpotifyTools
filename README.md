# 🎧 Spotify Tools
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=flat-square&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=flat-square&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
[![Publish to Github Pages](https://github.com/bautista225/SpotifyTools/actions/workflows/deploy.yml/badge.svg)](https://github.com/bautista225/SpotifyTools/actions/workflows/deploy.yml)

<p align="center">
  <img alt="Spotify Tools - Home" src="https://github.com/user-attachments/assets/d7c9841c-2c8a-4ba1-8b8c-fee34f1d7c05" />
</p>

## 🔎 Overview
With the initial intention of sorting a long playlist by most recent added tracks, this application was born. 

A responsive SPA for managin playlists and profile statistics for a Spotify Account, developed with React and Redux.

## 🌱 Key features
- Profile statistics (last year, last 6 months and last 4 weeks):
  - Number of tracks and artists listened.
  - Top 10 tracks.
  - Top 10 artists.
- Playlists:
  - Change default order of the playlist between the following values:
    - Date added
    - Popularity
    - Duration
    - Track name
    - Artist name
  - Get playlist's songs by Spotify popularity.

## 📖 Screenshots
![Home](https://github.com/user-attachments/assets/ab90b224-0c34-42da-a620-42f3cdac14c4)
![Profile](https://github.com/user-attachments/assets/d575cea2-239e-43f7-9feb-4120550c7c82)
![Manage playlists](https://github.com/user-attachments/assets/ad830e82-9c98-47ca-b09d-4c7c07e4a3f4)
![Playlist details](https://github.com/user-attachments/assets/33509388-4652-4708-b13f-0e4013bdabc9)

## 🖥 Installation in local
### Obtaining a Spotify Client ID
Login into Spotify Web API
In the dashboard, create a new app adding the following scope: 
```
playlist-read-private 
playlist-read-collaborative 
playlist-modify-public 
playlist-modify-private 
user-read-recently-played 
user-top-read
user-read-private
user-read-email
```
You'll retrieve your own client ID.
### Running in local
After clonning the repository, add a `.env` file with the following content:
```
VITE_CLIENT_ID=YOUR-SPOTIFY-DEVELOPER-CLIENT-ID
```
In the root directory of the repo, install the NPM packages with:
```
npm install
```
Run an instance in localhost:5173 with:
```
npm run dev
```
## Limitations
Since 2022 the Spotify API has limitations in the number of requests and the user accounts able to login through a Developer Client ID, as it needs to add the user account in the developer panel. If you want to use it by the Github Pages link, don't hesitate to ask me 😉

## ✨ Contributions
Contributions are welcome! If you have ideas to enhance the Spotify Tools App —whether it’s adding new features, improving the design, or expanding the content— feel free to submit a pull request. You can also share suggestions or feedback to help make this project even better!
