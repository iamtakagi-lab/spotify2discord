import fs from 'fs'

export default class Store {
  credential = {
    accessToken: null,
    refreshToken: null,
  }

  track: SpotifyApi.CurrentlyPlayingResponse = null

  setCredential({ accessToken, refreshToken }) {
    this.credential.accessToken = accessToken
    this.credential.refreshToken = refreshToken
    fs.writeFileSync('./data/credential.json', JSON.stringify(this.credential))
  }

  setAccessToken(accessToken) {
    this.credential.accessToken = accessToken
  }

  setRefreshToken(refreshToken) {
    this.credential.refreshToken = refreshToken
  }

  resetCredential() {
    this.credential.accessToken = null
    this.credential.refreshToken = null
  }

  setTrack(track: SpotifyApi.CurrentlyPlayingResponse) {
    this.track = track
  }

  resetTrack() {
    this.track = null
  }
}
