const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')
const product = require('./routes/product')
const article = require('./routes/article')

const app = express()

// Body parser
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'))
})

// Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/product', product)
app.use('/api/v1/article', article)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    // server.close(() => process.exit(1));
})
