require('dotenv').config()
require('express-async-errors')
//extra security packages 
const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')


const express=require('express')
const app= express()



//connect Db
const connectDB=require('./db/connect')
const authenticatedUser=require('./middleware/authentication')
//routers

const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/jobs')

//error Handler
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

app.use(express.json())
//extre pacakges
app.set('trust proxy',1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}))
app.use(xss())
app.use(helmet())
app.use(cors())
//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticatedUser,jobsRouter)


app.use(notFound)
app.use(errorHandlerMiddleware)

const port=process.env.PORT|| 3000

const start=async()=>{
try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log('server is listenting to the port ',port))
} catch (error) {
    console.log('it is not connected ');
    console.log(error)
}
}

start()