const express=require("express")
const cors=require("cors")
const { createTodo, updateTodo } = require("./types")
const {todo}=require("./db")
const app=express()
const port=3000
app.use(express.json())
app.use(cors(
    {
        origin:"http://localhost:5173"
    }
))
app.get("/todos",async (req,res)=>{
    const todos=await todo.find({})
    res.json(todos)

})

app.post("/todo",async (req,res)=>{
    const createPayload=req.body
    const parsePayload=createTodo.safeParse(createPayload)
    if(!parsePayload.success)
        {
            return res.status(411).json({
                msg:"You sent the wrong inputs"
            })
        }
    const todoObj=await todo.create({
        title:req.body.title,
        description:req.body.description,
        completed:false
    })
    res.json({
        msg:"created a todo"
    })

    
        
})
app.put("/completed",async (req,res)=>{
    const updatePayload=req.body
    const id=updatePayload.id
    const parsePayload=updateTodo.safeParse(updatePayload)
    if(!parsePayload.success)
    {
        return res.status(411).json({
            msg:"You sent the wrong inputs"
        })
    }
    await todo.updateOne({_id:id},{
        completed:true
    })
    res.json({
        msg:"Todo maked as completed"
    })
})
   

app.listen(port,()=>{
    console.log("listening to "+port)
})