import { useState } from "react";
import axios from "axios";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            const response = await axios.post("http://localhost:3000/todo", {
                title: title,
                description: description
            });
            alert("Todo Added");
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Failed to add todo");
        }
    };

    return (
        <div>
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="title"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <br />
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <br />
            <button
                style={{ padding: 10, margin: 10 }}
                onClick={handleAddTodo}
            >
                Add a Todo
            </button>
        </div>
    );
}
