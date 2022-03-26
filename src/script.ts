import axios from 'axios'

const inputUserName = document.getElementById('input-username') as HTMLInputElement
const inputPassword = document.getElementById('input-password') as HTMLInputElement
const inputSessionId = document.getElementById('input-session-id') as HTMLInputElement
const inputSessionUsername = document.getElementById('input-session-username') as HTMLInputElement
const inputUserId = document.getElementById('input-user-id') as HTMLInputElement
const inputUserToken = document.getElementById('input-user-token') as HTMLInputElement

const formLogin = document.getElementById('form-login') as HTMLFormElement
const buttonLogout = document.getElementById('button-logout') as HTMLButtonElement
const buttonStart = document.getElementById('button-start') as HTMLButtonElement

formLogin.onsubmit = async (e) => {
  e.preventDefault()

  try {
    const { sessionId } = (
      await axios.post('http://localhost:3125/login', {
        username: inputUserName.value,
        password: inputPassword.value
      })
    ).data

    localStorage.setItem('sid', sessionId)
    inputSessionId.value = sessionId
    inputSessionUsername.value = inputUserName.value
  } catch {}

  return false
}

buttonStart.onclick = async (e) => {
  const { userId, userToken } = (
    await axios.post('http://localhost:3125/start', undefined, {
      headers: { sid: localStorage.getItem('sid')! }
    })
  ).data

  inputUserId.value = userId
}

const fetchSessionInfo = async () => {
  const sid = localStorage.getItem('sid')
  if (!sid?.length) {
    return
  }

  try {
    const { username } = (
      await axios.get('http://localhost:3125/user', {
        headers: { sid: localStorage.getItem('sid')! }
      })
    ).data

    inputSessionId.value = sid
    inputSessionUsername.value = username
  } catch (e) {
    localStorage.removeItem('sid')
  }
}

void fetchSessionInfo()
