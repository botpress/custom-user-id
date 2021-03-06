import express from 'express'
import path from 'path'
import cors from 'cors'
import randomstring from 'randomstring'
import { MessagingClient } from '@botpress/messaging-client'
import config from './config.json'
import resolvePackagePath from 'resolve-package-path'

const messaging = new MessagingClient({
  url: 'http://localhost:3100',
  ...config.messaging
})

const app = express()
app.use(cors())
app.use(express.json())

// serve webchat assets
const injectAssetsDir = resolvePackagePath('@botpress/webchat-inject', __dirname)!
app.use('/webchat', express.static(path.join(path.dirname(injectAssetsDir), 'dist')))

// simulates a database that stores our users (plaintext passwords for simplicity)
const users: { [username: string]: string | undefined } = {
  admin: 'admin',
  bob: '12345',
  alice: 'abcde'
}

// we store our user sessions in this object
const sessions: { [username: string]: string | undefined } = {}

// simulates a very basic login system
app.post('/login', (req, res) => {
  console.log('attempting to login as', req.body)

  const { username, password } = req.body
  const userPassword = users[username]

  if (!userPassword) {
    console.log('this user does not exist!')
    return res.sendStatus(404)
  }

  if (userPassword !== password) {
    console.log('wrong password!')
    return res.sendStatus(401)
  }

  const sessionId = randomstring.generate(32)
  sessions[sessionId] = username

  res.send({ sessionId })
  console.log(`success!`)
})

app.post('/logout', (req, res) => {
  const sessionId = req.headers['sid'] as string
  const username = sessions[sessionId]

  if (!username) {
    return res.sendStatus(401)
  }

  delete sessions[sessionId]
  console.log(`${username} logged out`)

  res.sendStatus(200)
})

app.get('/user', (req, res) => {
  const sessionId = req.headers['sid'] as string
  const username = sessions[sessionId]

  if (!username) {
    return res.sendStatus(401)
  }

  res.send({ username })
})

// route to start a conversation on messaging
app.post('/start', async (req, res) => {
  try {
    const sessionId = req.headers['sid'] as string
    const username = sessions[sessionId]

    if (!username) {
      console.log('cannot start chat with invalid session id!')
      return res.sendStatus(401)
    }

    console.log(`starting chat for ${username}`)

    const conversationId = await messaging.mapEndpoint({
      channel: 'mychannel',
      identity: '*',
      thread: '*',
      sender: username
    })
    const { userId } = (await messaging.getConversation(conversationId))!
    const userToken = await messaging.createUserToken(userId)

    console.log(`user id is ${userId}`)
    res.send({ userId, userToken: userToken.token })
  } catch (e: any) {
    console.log('unexpected error occurred calling messaging', {
      message: e.message,
      response: e.response?.data,
      status: e.response?.status
    })

    res.sendStatus(500)
  }
})

app.get('/client-id', (req, res) => {
  res.send({ clientId: config.messaging.clientId })
})

app.listen(3125)
console.log(`listening on port 3125`)
