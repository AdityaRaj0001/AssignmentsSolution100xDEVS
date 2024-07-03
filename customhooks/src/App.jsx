//loading is already set to true, inside the custom hook
import { useEffect, useState } from "react";
import axios from "axios";

function useTodos(n) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  function getData() {
    axios
      .get("https://sum-server.100xdevs.com/todos")
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getData(); // Initial data fetch
    const intervalId = setInterval(() => {
      getData();
    }, n * 1000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [n]);

  return {
    todos,
    loading,
  };
}
function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
  }, []);

  return isOnline;
}
const useMousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};
const useInterval = (callback, delay) => {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);

    return () => clearInterval(intervalId);
  }, [callback, delay]);
};
const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay has passed
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const { todos, loading } = useTodos(5);
  const isOnline = useIsOnline();
  const mousePointer = useMousePointer();
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  useInterval(() => {
    setCount((c) => c + 1);
  }, 500);

  if (loading) {
    return (
      <div> {isOnline ? "You are online yay!" : "You are not online"}</div>
    );
  }

  return (
    <>
      {todos.map((todo) => (
        <Track key={todo.id} todo={todo} />
      ))}
      {isOnline ? "You are online yay!" : "You are not online"}
      <p> Your mouse position is {mousePointer.x} {mousePointer.y}</p>
     <p><>Timer is at {count}</></p>
     <p>{debouncedValue}</p>
     <input
     className="border border-black"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
    
    </>
  );
}

function Track({ todo }) {
  return (
    <div>
      <strong>{todo.title}</strong>
      <br />
      {todo.description}
    </div>
  );
}

export default App;
