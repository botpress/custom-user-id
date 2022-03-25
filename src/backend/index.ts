import express from 'express'
import path from 'path'

const app = express()

app.use(express.json())
app.use('/webchat', express.static(path.join(__dirname, '../../node_modules/@botpress/webchat-inject/dist')))

app.listen(3125)
console.log(`listening on port 3125`)
