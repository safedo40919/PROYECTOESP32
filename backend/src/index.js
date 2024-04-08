import 'dotenv/config'
import express from 'express'
import bcrypt from 'bcrypt'

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

  const userid = crypto.randomUUID()
  const hashPass = await bcrypt.hash(password, 10)

  const [data] = await conn.query(
    `
    INSERT INTO users (id, name, email, password)
    VALUES (?, ?, ?, ?);
    `,
    [userid, name, email, hashPass],
  )

  res.sendStatus(201)
})

//sensores: ____________
app.get('/sensores', async (req, res) => {
  const [data] = await conn.query('SELECT * FROM sensores;')

  res.json({
    data,
  })
})

app.post('/sensores', async (req, res) => {
  const { status, idUser } = req.body

  const id = crypto.randomUUID()
  const time = new Date()

  const [data] = await conn.query(
    `
    INSERT INTO sensores (id, status, time, user_id)
    VALUES (?, ?, ?, ?);
    `,
    [id, status, time, idUser],
  )

  res.sendStatus(201)
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
