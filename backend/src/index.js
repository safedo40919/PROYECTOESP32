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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//USER: __________
app.get('/user', async (req, res) => {
  const [data] = await conn.query('SELECT * FROM users;')
  res.json({ data })
})

app.get('/user/:id', async (req, res) => {
  const id = req.params.id

  const [data] = await conn.query('SELECT * FROM users WHERE id = ?;', [id])
  res.json({
    data,
  })
})

app.post('/user', async (req, res) => {
  const { name, email, password } = req.body

  const id = Math.random(9999999999999) // Generar un ID único

  // Utilizar marcadores de posición (?) en la consulta SQL
  const [data] = await conn.query(
    `
    INSERT INTO users (id, name, email, password)
    VALUES (?, ?, ?, ?);
    `,
    [id, name, email, password], // Pasar los valores como un arreglo
  )

  res.sendStatus(201)
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
