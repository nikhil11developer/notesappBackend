const   express = require('express')
const app = express()
const mongoose = require('mongoose')


const PORT=5000

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/nikhilzipper')
const database=mongoose.connection


database.on('error',(error)=>{
    console.log(error)
})

database.once('connected',()=>{
    console.log('database connected')
})

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))
app.use('/api/user' , require('./routes/user'))

app.get("/" , (req , res)=>{
    
    res.send("nikhil srivastava the master developer")
})




app.listen(PORT, ()=>{
    console.log(`the application has been started on port ${PORT}`);
})