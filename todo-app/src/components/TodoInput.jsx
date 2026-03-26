import { useState } from "react";

export default function TodoInput({ onAdd }) {
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [expanded, setExpanded] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text, description);
        setText("");
        setDescription("");
        setExpanded(false);
    }

    function handleFormBlur(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setExpanded(false);
        }
    }

    return (
        <form className="input-form" onSubmit={handleSubmit} onBlur={handleFormBlur}>
            <div className="input-row">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="What needs to be done?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setExpanded(true)}
                />
                <button className="add-btn" type="submit">
                    ADD
                </button>
            </div>
            {expanded && (
                <textarea
                    className="desc-input"
                    placeholder="Add a short description... (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                />
            )}
        </form>
    );
}
