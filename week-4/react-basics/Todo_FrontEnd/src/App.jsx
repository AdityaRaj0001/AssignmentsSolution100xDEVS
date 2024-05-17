import { useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todosstate,setTodosstate]=useState([]);
 fetch("http://localhost:3000/todos").then(async (res)=>{
  let resJson=await res.json()
  setTodosstate(resJson)
 })
  
  return(
    <div>
      <CreateTodo></CreateTodo>
      <Todos todosstate={todosstate} setTodosstate={setTodosstate}></Todos>

    </div>
  )
}

export default App
