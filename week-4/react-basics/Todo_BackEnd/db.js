const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/todo")
const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
let todo=mongoose.model("todos",todoSchema)

module.exports={
    todo
}
