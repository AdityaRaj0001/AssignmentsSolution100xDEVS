const express=require('express')
const mongoose=require('mongoose')
const app=express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/TestDB1")   
const User = mongoose.model('Users', { name: String, email: String, password: String});
// const user = new User({ name: 'bhaijaan',email:"bhai@gmail.com",password:"xyz" });
// user.save()
app.get("/",(req,res)=>{
    console.log("hello world")
    res.send({msg:"hello"})
})

app.post('/signup', async function(req,res){

    const name=req.body.name
    const email=req.body.email
    const password=req.body.password

    const existingUser=await User.findOne({email:email})

    if(existingUser)return res.status(400).send("email used in registration already exists!")

    const user=new User({
        name:name,
        email:email,
        password:password
    })
    user.save()
    res.send("user saved ji")

})




app.listen(3000,()=>{
    console.log("listening to requests  on port 3000! hit em!!")
})
