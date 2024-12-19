const baseKey = 'SpotifyTools'

const saveSession = (session) => {
  localStorage.setItem(`${baseKey}_session`, JSON.stringify(session))
}

const loadSession = () => {
  return JSON.parse(window.localStorage.getItem(`${baseKey}_session`)||null)
}

const removeSession = () => {
  localStorage.removeItem(`${baseKey}_session`)
}

export default {
    saveSession,
    loadSession,
    removeSession,
}