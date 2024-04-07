import 'dotenv/config'
import express from 'express'

//database ______
import { createConnection } from 'mysql2/promise'

const conn = await createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
})

const app = express()
const PORT = process.env.PORT ?? 3000

//USER: __________
app.get('/user', async (req, res) => {
  const [data] = await conn.query('SELECT * FROM users;')
  res.json({ data })
})

app.get('/user/:id', (req, res) => {
  res.json({
    msg: 'hola mundo!!',
  })
})

app.post('/user', (req, res) => {
  res.json({
    msg: 'hola mundo!!',
  })
})

//sensores: ____________
app.get('/sensores', (req, res) => {
  res.json({
    msg: 'hola mundo!!',
  })
})

app.post('/sensores', (req, res) => {
  res.json({
    msg: 'hola mundo!!',
  })
})

//leds:________________
app.get('/leds', (req, res) => {
  res.json({
    msg: 'hola mundo!!',
  })
})

//runnig server
app.listen(PORT)
console.log('server runnig port: ' + PORT)
