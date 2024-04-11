require('dotenv').config()
require('express-async-errors')

const path=require('path')
//extra security packages 
const helmet=require('helmet')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')

//swagger
//const swaggerUI = require('swagger-ui-express');
//const YAML = require('yamljs');
//const swaggerDocument = YAML.load('./swagger.yaml');



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

//extre pacakges
app.use(express.static(path.resolve(__dirname,'./client/build')))
app.use(express.json())

app.use(helmet())
app.use(xss())


//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticatedUser,jobsRouter)
//any other routes , call index.html

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

  
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