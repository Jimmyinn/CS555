export default function SettingsPage({ theme, setTheme, goBack }) {
    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    return (
        <div className="app">
            <div className="container">
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
            </div>
        </div>
    );
}