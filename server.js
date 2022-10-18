const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { executor } = require('./executor')
const app = express()
const port = 8080

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

app.post('/', async(req, res) => {

    let language = req.body.formData.language
    let sourceCode = req.body.formData.sourceCode
    let input = req.body.formData.stdin

    console.log(sourceCode)
    console.log(req.body)
    var codeOutput = await executor(language.toLowerCase(), sourceCode, input)
    console.log(codeOutput)
    res.send(codeOutput)
})

// run server
app.listen(port, () => {
    console.log(`Coderunner backend listening on port ${port}`)
})