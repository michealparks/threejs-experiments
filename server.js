const express = require('express')
const app = express()
const port = 5000
const staticDir = express.static('pages')
app.use('/threejs-experiments', staticDir)
app.use(staticDir)
app.listen(port, () => console.log(`Listening on port ${port}.`))
