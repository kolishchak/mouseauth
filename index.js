const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))

app.post('/api/postUserTimeline', (req, res) => {
  console.log(req.body)
  res.status(200).send('OK')
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(8080, () => console.log('Listening on port 8080!'))
