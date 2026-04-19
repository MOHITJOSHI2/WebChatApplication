const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')
require('dotenv').config({ quiet: true })
require('./database/connection')
const cors = require('cors')
const { authenticateUsers } = require('./middlewares/jwt')
const { authJWT } = require('./auth/jwtAuth')
const cookieParser = require('cookie-parser')
const { socketInput } = require('./controllers/socketController')

//Routes
const userRoutes = require('./routes/userRoutes')
const friendRoutes = require('./routes/friendRoutes')

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on('connection', socket => {
    console.log("A user connected")
    socketInput(io, socket)

})


//jwtAuth for all
app.get("/jwtAuth", authenticateUsers, authJWT)

//Auth routes
app.use("/auth", userRoutes)

//User Routes
app.use("/user", authenticateUsers, userRoutes)

//Friend Related Routes
app.use('/friends', authenticateUsers, friendRoutes)

server.listen(process.env.PORT, () => {
    console.log(`connected on port ${process.env.PORT}`)
})