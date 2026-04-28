import { useState } from "react";

export default function TodoImport({ setTodos }) {
  const [showWarning, setShowWarning] = useState(false);

  function startImport() {
    setShowWarning(true);
  }

  function handleImport() {
    setShowWarning(false);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);

          const normalized = parsed.map((t) => ({
            id: t.id ?? Date.now() + Math.random(), // Added random number to uniquely differentiate if missing id
            text: t.text ?? "",
            description: t.description ?? "",
            completed: t.completed ?? false,
            tags: t.tags ?? [],
            subtasks: (t.subtasks ?? []).map((st) => ({
              id: st.id ?? Date.now() + Math.random(), // Same as above
              text: st.text ?? "",
              completed: st.completed ?? false,
            })),
          }));

          setTodos(normalized);
        } catch {
          alert("Invalid file provided!");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  return (
    <>
      <div className="settings-import">
        <button onClick={startImport}>Import</button>
      </div>
      {showWarning && (
        <div className="settings-modal-overlay" onClick={() => setShowWarning(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <p>WARNING: Importing will replace all of your current tasks.</p>
            <div className="settings-warning-actions">
              <button onClick={handleImport}>Continue</button>
              <button onClick={() => setShowWarning(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
