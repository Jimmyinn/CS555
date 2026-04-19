import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

import TodoSettings from "./components/configBar/TodoSettings";
import TodoAbout from "./components/configBar/TodoAbout";

import AboutPage from "./components/AboutPage";
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

  // Tag state (Sebastian)
  const [activeTag, setActiveTag] = useState(null);

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
    setTodos([...todos, { id: Date.now(), text: text.trim(), description: description.trim(), completed: false, tags: [] }]);
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

  // Tag Helpers
  function addTag(id, tag) {
    const cleaned = tag.trim().toLowerCase();
    if (!cleaned || cleaned.length > 25) return;
  
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
  
        // prevent duplicates, enforces 5-tag-per-task limit
        if (t.tags.includes(cleaned) || t.tags.length >= 5) return t;
  
        return { ...t, tags: [...t.tags, cleaned] };
      })
    );
  }
  
  function removeTag(id, tag) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, tags: t.tags.filter((tg) => tg !== tag) }
          : t
      )
    );
  }

  // Other variables
  const filtered = todos.filter((t) => {
    // status filter
    if (filter === "active" && t.completed) return false;
    if (filter === "completed" && !t.completed) return false;
  
    // tag filter
    if (activeTag && !(t.tags ?? []).includes(activeTag)) {
      return false;
    }
  
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
              <TodoAbout onClick={() => setPage("about")}/>
              <TodoSettings openSettings={() => setPage("settings")}/>
            </div>
          </div>
        </header>
        )}
        
        {page === "main" && (
        <>
          <TodoInput onAdd={addTodo} />

          <TodoFilter filter={filter} onFilter={setFilter} />

          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />

          {todos.some((t) => t.completed) && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </>
        )} 
        
        {page === "about" && (
          <AboutPage goBack={() => setPage("main")} />
        )}

        {page === "settings" && (
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