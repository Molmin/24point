import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
    if ('OPTIONS' == req.method) return res.send(200)
    next()
})

app.listen(2424, () => {
    console.log('Port :2424 is opened')
})  