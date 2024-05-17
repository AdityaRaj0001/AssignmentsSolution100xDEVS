import React from 'react';
import axios from 'axios';

export function Todos(props) {
    const handleComplete = async (id) => {
        try {
            const response = await axios.put("http://localhost:3000/completed", { id });
    
            // Optionally, update the state here to reflect the change in completion status
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div>
            {props.todosstate.map((todo, i) => {
                return (
                    <div key={todo._id}>
                        <h1>{todo.title}</h1>
                        <h1>{todo.description}</h1>
                        <button
                            onClick={() => handleComplete(todo._id)}
                        >
                            {todo.completed ? "Completed" : "Mark as Complete"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
