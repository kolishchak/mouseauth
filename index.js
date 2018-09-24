const express = require('express')
const path = require('path')
const os = require('os')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(8080, () => console.log('Listening on port 8080!'))
