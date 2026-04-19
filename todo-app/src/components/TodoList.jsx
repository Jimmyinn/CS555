import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onDelete, onEdit, onAddTag, onRemoveTag, activeTag, setActiveTag }) {
    if (todos.length === 0) {
        return <p className="empty">Nothing here yet.</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onAddTag={onAddTag}
                    onRemoveTag={onRemoveTag}
                    activeTag={activeTag}
                    setActiveTag={setActiveTag}
                />
            ))}
        </ul>
    );
}