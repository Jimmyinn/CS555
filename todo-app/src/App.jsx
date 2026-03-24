import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text, description = "") {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), description: description.trim(), completed: false }]);
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed));
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <span className="header-tag">YOUR</span>
          <h1 className="title">TASKS</h1>
          <span className="header-count">{activeCount} remaining</span>
        </header>

        <TodoInput onAdd={addTodo} />

        <TodoFilter filter={filter} onFilter={setFilter} />

        <TodoList
          todos={filtered}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        {todos.some((t) => t.completed) && (
          <button className="clear-btn" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}