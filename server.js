const express = require('express')
const app = express()
app.use(express.static('pages'))
app.listen(5000)
