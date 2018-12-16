const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

const NODE_PORT = 8080
const FLASK_PORT = 5000

const yellowLog = () => console.log('user id: 5c00a63fe6c3f90cdca646ab status: \x1b[33mtraining\x1b[0m')
const greenLog = () => console.log('user id: 5c00a63fe6c3f90cdca646ab status: \x1b[32mok\x1b[0m')
const redLog = () => console.log('user id: 5c00a63fe6c3f90cdca646ab status: \x1b[31mwrong user\x1b[0m')

const handlePythonResponse = (pythonRes) => {
  switch (pythonRes.code) {
    case 'training': {
      yellowLog()
      break
    }
    case 'ok': {
      greenLog()
      break
    }
    case 'bad': {
      redLog()
      break
    }
    default: {
      console.error('Unexpected python response code')
    }
  }
}

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

    if (pythonRes.error) {
      throw new Error(pythonRes.error)
    }

    handlePythonResponse(pythonRes.data)

    res.status(200).send(pythonRes.data)
  } catch (error) {
    res.status(500).send('error')
  }
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(NODE_PORT, () => console.log(`Listening on port ${NODE_PORT}!`))
