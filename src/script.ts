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
    buttonLogout.disabled = false
  } catch {
    localStorage.removeItem('sid')
    inputSessionId.value = ''
    inputSessionUsername.value = ''
    buttonLogout.disabled = true
  }

  return false
}

buttonStart.onclick = async (e) => {
  try {
    const { userId, userToken } = (
      await axios.post('http://localhost:3125/start', undefined, {
        headers: { sid: localStorage.getItem('sid')! }
      })
    ).data

    inputUserId.value = userId
    inputUserToken.value = userToken
  } catch {}
}

buttonLogout.onclick = async (e) => {
  await axios.post('http://localhost:3125/logout', undefined, {
    headers: { sid: localStorage.getItem('sid')! }
  })

  inputSessionId.value = ''
  inputSessionUsername.value = ''
  buttonLogout.disabled = true
  localStorage.removeItem('sid')
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
    buttonLogout.disabled = false
  } catch (e) {
    localStorage.removeItem('sid')
  }
}

const initializeWebchat = async () => {
  const { clientId } = (await axios.get('http://localhost:3125/client-id')).data

  const win = window as any
  win.botpressWebChat.init({
    hostUrl: 'http://localhost:3125/webchat',
    messagingUrl: 'http://localhost:3100',
    clientId
  })
}

void fetchSessionInfo()
void initializeWebchat()
