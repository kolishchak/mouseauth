const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

const NODE_PORT = 8080
const FLASK_PORT = 5000

const flaskAxios = axios.create({
  proxy: {
    host: 'localhost',
    port: FLASK_PORT,
  },
})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))

// Routes
app.post('/api/postUserTimeline', async (req, res) => {
  try {
    const pythonRes = await flaskAxios.post('/api/linguistic', req.body)
    res.status(200).send(pythonRes)
  } catch (error) {
    res.status(error.response.status).send(error.response.data)
  }
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(NODE_PORT, () => console.log(`Listening on port ${NODE_PORT}!`))
