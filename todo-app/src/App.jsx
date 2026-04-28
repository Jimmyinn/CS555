import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

import TodoSettings from "./components/configBar/TodoSettings";
import TodoAbout from "./components/configBar/TodoAbout";

import AboutPage from "./components/AboutPage";
import SettingsPage from "./components/SettingsPage";

import TagFilterBar from "./components/TagFilterBar";
import TutorialPage from "./components/TutorialPage";

import "./App.css";

export default function App() {
  // App state
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  // Additional state (Sebastian)
  const [page, setPage] = useState(() => { return "main"; });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Tag state (Sebastian)
  const [activeTags, setActiveTags] = useState([]);

  // List of all tags
  const allTags = Array.from(
    new Set(todos.flatMap((t) => t.tags || []))
  );

  // Browser Data Saves
  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Filter out tags no longer attached to any task items
  useEffect(() => {
    setActiveTags((prev) =>
      prev.filter((tag) => allTags.includes(tag))
    );
  }, [todos]);

  // Todo helpers
  function addTodo(text, description = "") {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), description: description.trim(), completed: false, tags: [], subtasks: [] }]);
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

  // Tag helpers
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

  // Subtask helpers
  function addSubtask(todoId, text) {
    if (!text.trim()) return;

    setTodos(prev =>
      prev.map(t => {
        if (t.id !== todoId) return t;

        const subtasks = t.subtasks || [];

        if (subtasks.length >= 10) return t;

        return {
          ...t,
          subtasks: [
            ...subtasks,
            { id: Date.now(), text: text.trim(), completed: false }
          ]
        };
      })
    );
  }

  function toggleSubtask(todoId, subId) {
    setTodos(prev =>
      prev.map(t =>
        t.id === todoId
          ? {
            ...t,
            subtasks: t.subtasks.map(st =>
              st.id === subId
                ? { ...st, completed: !st.completed }
                : st
            )
          }
          : t
      )
    );
  }

  function deleteSubtask(todoId, subId) {
    setTodos(prev =>
      prev.map(t =>
        t.id === todoId
          ? {
            ...t,
            subtasks: t.subtasks.filter(st => st.id !== subId)
          }
          : t
      )
    );
  }

  // Other variables
  const filtered = todos.filter((t) => {
    if (filter === "active" && t.completed) return false;
    if (filter === "completed" && !t.completed) return false;

    if (activeTags.length > 0) {
      const tags = t.tags || [];

      const matches = activeTags.every((tag) => tags.includes(tag));

      if (!matches) return false;
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
              <TagFilterBar
                allTags={allTags}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
              />

              <div className="header-buttons">
                <TodoAbout onClick={() => setPage("about")} />
                <TodoSettings openSettings={() => setPage("settings")} />
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
              onAddSubtask={addSubtask}
              onToggleSubtask={toggleSubtask}
              onDeleteSubtask={deleteSubtask}
            />

            {todos.some((t) => t.completed) && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
            <button
              className="help-fab"
              onClick={() => setPage("tutorial")}
              title="Help & Tutorial"
            >
              ?
            </button>
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

        {page === "tutorial" && (
          <TutorialPage goBack={() => setPage("main")} />
        )}
      </div>
    </div>
  );
}
