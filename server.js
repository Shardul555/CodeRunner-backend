const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

// cors configuration
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// APIs
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('Hello World!')
})

// run server
app.listen(port, () => {
    console.log(`Coderunner backend listening on port ${port}`)
})