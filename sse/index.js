const express = require('express')
const app = express()

const port = 3000

// Define route
app.get('/', (req, res) => {
    console.log('Connected to client')

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')

    const intervalId = setInterval(() => {
        const date = new Date().toLocaleString()
        res.write(`data: ${date}\n\n`)
    }, 1000)

    res.on('close', () => { clearInterval(intervalId) })
    // res.status(200).send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})