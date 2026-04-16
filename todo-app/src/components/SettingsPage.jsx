import TodoExport from "./configBar/TodoExport";
import TodoImport from "./configBar/TodoImport";

export default function SettingsPage({ theme, setTheme, goBack, todos, setTodos }) {
    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    return (
        <>
            <h1 className="title">SETTINGS</h1>
            <button className="clear-btn" onClick={goBack}>
                Back
            </button>
            <div className="settings-card">
                <div className="settings-row">
                    <span>Theme</span>
                    <button className="add-btn" onClick={toggleTheme}>
                        {theme}
                    </button>
                </div>
            </div>
            <div className="settings-card">
                <div className="settings-row">
                    <span>Data</span>
                    <div className="settings-buttons">
                        <TodoExport todos={todos}/>
                        <TodoImport setTodos={setTodos}/>
                    </div>
                </div>
            </div>
        </>
    );
}