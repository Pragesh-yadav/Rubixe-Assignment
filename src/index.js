const express = require("express")
const route = require("./routes/route")
const app = express()
const mongoose = require("mongoose")
const multer = require("multer")
app.use(express.json())
mongoose.set('strictQuery', false);

//app.use(multer().any())


mongoose.connect("mongodb+srv://Pragesh_Yadav:Mongoblog22@cluster0.ebq4hak.mongodb.net/UserData",
    {useNewUrlParser: true
    })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));

app.use('/', route)


app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running on port",(process.env.PORT || 3000) )
})