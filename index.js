const express = require('express')
const path = require('path')
const os = require('os')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))

app.get(['/', '/dashboard', '/login'], (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

// Does not existed pages 404
app.get('*', (req, res) => {
  res.status(404).send('Page doesn\'t exist')
})

app.listen(8080, () => console.log('Listening on port 8080!'))
