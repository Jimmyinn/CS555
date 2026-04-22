import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onDelete, onEdit, onAddTag, onRemoveTag, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
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
                    onAddSubtask={onAddSubtask}
                    onToggleSubtask={onToggleSubtask}
                    onDeleteSubtask={onDeleteSubtask}
                />
            ))}
        </ul>
    );
}