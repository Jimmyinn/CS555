import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onAddTag, onRemoveTag, activeTag, setActiveTag }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDescription, setEditDescription] = useState(todo.description);
    
    // Tag state
    const [addingTag, setAddingTag] = useState(false);
    const [tagInput, setTagInput] = useState("");

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
                        <span
                        key={tag}
                        className="tag"
                        onClick={() => 
                            setActiveTag((prev) => (prev === tag ? null : tag))
                        }
                        style={{ cursor: "pointer" }}
                        >
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
            </div>
            
            <button
                className={`tag-add-btn ${addingTag ? "is-adding" : ""}`}
                onClick={() => setAddingTag((prev) => !prev)}
                title={addingTag ? "Cancel" : "Add tag"}
            >
                {addingTag ? "×" : "#+"}
            </button>

            <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                aria-label="Edit todo"
                title="Edit"
            >
                📝
            </button>
            {!addingTag && (<button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
                aria-label="Delete todo"
            >
                ×
            </button>)}

            {addingTag && (
                <div style={{ marginTop: "8px", width: "100%" }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onAddTag(todo.id, tagInput);
                            setTagInput("");
                            setAddingTag(false);
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
            
        </li>
    );
}