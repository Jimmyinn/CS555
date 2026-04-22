import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onAddTag, onRemoveTag, onAddSubtask, onToggleSubtask, onDeleteSubtask  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDescription, setEditDescription] = useState(todo.description);
    
    // Tag state
    const [tagInput, setTagInput] = useState("");

    // Subtask state
    const [subtaskInput, setSubtaskInput] = useState("");

    // Tag/Subtask being added state
    const [activeEditor, setActiveEditor] = useState(null);

    function handleSave() {
        if (editText.trim()) {
            onEdit(todo.id, editText, editDescription);
            setIsEditing(false);
        }
    }

    function handleCancel() {
        setEditText(todo.text);
        setEditDescription(todo.description);
        setIsEditing(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && e.ctrlKey) {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    }

    if (isEditing) {
        return (
            <li className="todo-item editing">
                <div className="edit-form">
                    <input
                        type="text"
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        placeholder="Task title"
                    />
                    <textarea
                        className="edit-textarea"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Description (optional)"
                        rows="2"
                    />
                    <div className="edit-buttons">
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <button
                className="check-btn"
                onClick={() => onToggle(todo.id)}
                aria-label="Toggle todo"
            >
                {todo.completed && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>
            <div className="todo-content" /*onDoubleClick={() => setIsEditing(true)}*/>
                <span className="todo-text">{todo.text}</span>
                {todo.description && (
                    <span className="todo-desc">{todo.description}</span>
                )}

                {/* TAGS */}
                {todo.tags && todo.tags.length > 0 && (
                    <div className="tag-row">
                        {todo.tags.map((tag) => (
                            <span key={tag} className="tag">
                            {tag}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveTag(todo.id, tag);
                              }}
                            >
                              ×
                            </button>
                        </span>
                        ))}
                    </div>
                )}

                {/* SUBTASKS */}
                {todo.subtasks && todo.subtasks.length > 0 && (
                <div className="subtask-list">
                    {todo.subtasks.map((st) => (
                    <div key={st.id} className="subtask-item">
                        <button
                        className="subtask-check"
                        onClick={() => onToggleSubtask(todo.id, st.id)}
                        >
                        {st.completed && "✓"}
                        </button>

                        <span className={`subtask-text ${st.completed ? "done" : ""}`}>
                        {st.text}
                        </span>

                        <button
                        className="subtask-delete"
                        onClick={() => onDeleteSubtask(todo.id, st.id)}
                        >
                        ×
                        </button>
                    </div>
                    ))}
                </div>
                )}
            </div>
            
            <button
                className="subtask-add-btn"
                onClick={() =>
                    setActiveEditor(prev =>
                      prev === "subtask" ? null : "subtask"
                    )
                }
                >
                {activeEditor === "subtask" ? "×" : "☰"}
            </button>

            <button
                className={`tag-add-btn ${activeEditor === "tag" ? "is-adding" : ""}`}
                onClick={() =>
                    setActiveEditor(prev =>
                      prev === "tag" ? null : "tag"
                    )
                }
                title={activeEditor === "tag" ? "Cancel" : "Add tag"}
            >
                {activeEditor === "tag" ? "×" : "#+"}
            </button>

            <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                aria-label="Edit todo"
                title="Edit"
            >
                📝
            </button>
            {!(activeEditor === "tag" || activeEditor === "subtask") && (<button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
                aria-label="Delete todo"
            >
                ×
            </button>)}

            {activeEditor === "tag" && (
                <div style={{ marginTop: "8px", width: "100%" }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onAddTag(todo.id, tagInput);
                            setTagInput("");
                            setActiveEditor(null);
                        }}
                    >
                        <input
                            className="edit-input"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="add tag..."
                            autoFocus
                        />
                    </form>
                </div>
            )}

            {activeEditor == "subtask" && (
            <form
                onSubmit={(e) => {
                e.preventDefault();
                onAddSubtask(todo.id, subtaskInput);
                setSubtaskInput("");
                setActiveEditor(null);
                }}
                style={{ marginTop: "8px", width: "100%" }}
            >
                <input
                className="edit-input"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                placeholder="add subtask..."
                autoFocus
                />
            </form>
            )} 
            
        </li>
    );
}