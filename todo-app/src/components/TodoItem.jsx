export default function TodoItem({ todo, onToggle, onDelete }) {
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
            <div className="todo-content">
                <span className="todo-text">{todo.text}</span>
                {todo.description && (
                    <span className="todo-desc">{todo.description}</span>
                )}
            </div>
            <button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
                aria-label="Delete todo"
            >
                ×
            </button>
        </li>
    );
}