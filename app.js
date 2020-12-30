//'npm start' for production
//'npm run dev' for development

const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// Load config
dotenv.config({ path: './.env'})

// Connect MongoDB
const connectDB = require('./db')
connectDB()

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Import routes
const userRoute = require('./routes/user')

// Middleware
app.use('/api/user', userRoute)

app.use('/', (req, res) => {
    res.send('Game compare bot API')
})

app.listen(PORT, () => {
    console.log(`Sever running in ${process.env.NODE_ENV} mode on ${PORT}`)
})