import 'dotenv/config'
import express from "express"

const app = express()

app.get('/', (req,res) => {
    res.send("hello you are on my server now!")
})

app.get('/x', (req,res) => {
    res.send("@evilstein_")
})

app.listen(process.env.PORT, () => {
    console.log(`now listening on port ${process.env.PORT}`)
})

console.log(`http://localhost:${process.env.PORT}/`)