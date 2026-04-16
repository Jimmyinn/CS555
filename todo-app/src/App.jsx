import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

import TodoSettings from "./components/configBar/TodoSettings";

import SettingsPage from "./components/SettingsPage";

import "./App.css";

export default function App() {
  // App state
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  // Additional state (Sebastian)
  const [page, setPage] = useState(() => {return "main";});

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Browser Data Saves
  useEffect(() => {
    localStorage.setItem("theme", theme);
  
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Todo helpers
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

  function editTodo(id, text, description) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: text.trim(), description: description.trim() } : t)));
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed));
  }

  // Other variables
  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  // Main
  return (
    <div className="app">
      <div className="container">
        {page === "main" && (
        <header className="header">
          <div className="header-top">
            <span className="header-tag">YOUR</span>
            <h1 className="title">TASKS</h1>
            <span className="header-count">{activeCount} remaining</span>
          </div>

          <div className="header-bottom">
            <div className="header-buttons">
              <TodoSettings openSettings={() => setPage(page === "main" ? "settings" : "main")}/>
            </div>
          </div>
        </header>
        )}
        
        {page === "main" ? (
        <>
          <TodoInput onAdd={addTodo} />

          <TodoFilter filter={filter} onFilter={setFilter} />

          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {todos.some((t) => t.completed) && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </>
        ) : (
          <SettingsPage
            theme={theme}
            setTheme={setTheme}
            goBack={() => setPage("main")}
            todos={todos}
            setTodos={setTodos}
          />
      )}
      </div>
    </div>
  );
}