const express = require('express')
const app = express()

const open = (url) => {
  const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open')
  require('child_process').exec(`${start} ${url}`)
}

const staticDir = express.static('pages')
app.use('/threejs-experiments', staticDir)
app.use(staticDir)

const port = 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
  open('http://localhost:5000')
})
