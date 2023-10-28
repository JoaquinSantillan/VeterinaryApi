const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()

app.options('*', cors());
app.use(cookieParser(process.env.COOKIE_SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }));

    app.use(cors({
      origin: true,
      credentials: true
    }));


app.use(express.json())
app.use(express.urlencoded({extended:true}))


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.95sfmju.mongodb.net/${process.env.DBNAME}`
mongoose.connect(uri,{
      useNewUrlParser:true,useUnifiedTopology:true
})

      .then(()=>{console.log('base de datos conectada')})
      .catch(e=>{console.log(e)})

const users = require('./apiservices/User/route')
const pacientes = require('./apiservices/Pacientes/routes')

app.use('/api/users',users)
app.use('/api/users/',pacientes)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
      console.log('server on port',PORT)
})

module.exports = app;