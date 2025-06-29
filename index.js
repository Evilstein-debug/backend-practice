import 'dotenv/config'
import express from "express"
import { title } from 'process'

const app = express()

app.get('/', (req,res) => {
    res.send("hello you are on my server now!")
})

app.get('/x', (req,res) => {
    res.send("@evilstein_")
})

app.get('/api/jokes', (req,res) => {
    const jokes = [
        {
            id: 1,
            title: 'A first joke',
            content: 'This is the first joke'

        },
        {
            id: 2,
            title: 'A second joke',
            content: 'This is the second joke'

        },
        {
            id: 3,
            title: 'A third joke',
            content: 'This is the third joke'

        },
        {
            id: 4,
            title: 'A fourth joke',
            content: 'This is the fourth joke'

        },
        {
            id: 5,
            title: 'A fifth joke',
            content: 'This is the fifth joke'

        }
    ]
    res.send(jokes)
})

app.listen(process.env.PORT, () => {
    console.log(`now listening on port ${process.env.PORT}`)
})

console.log(`http://localhost:${process.env.PORT}/`)