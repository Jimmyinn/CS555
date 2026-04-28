export default function TodoImport({setTodos}) {
  function handleImport(e) {
    // 1. Show the warning prompt first
    const confirmClear = window.confirm(
      "Warning: Importing a new file will permanently clear all of your current tasks. Do you want to proceed?"
    );

    // 2. Only proceed if the user clicks "OK"
    if (!confirmClear) return;

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
            id: t.id ?? Date.now() + Math.random(),
            text: t.text ?? "",
            description: t.description ?? "",
            completed: t.completed ?? false,
            tags: t.tags ?? [],
            subtasks: (t.subtasks ?? []).map((st) => ({
              id: st.id ?? Date.now() + Math.random(),
              text: st.text ?? "",
              completed: st.completed ?? false,
            })),
          }));

          setTodos(normalized);
          alert("Import successful!");
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
      <button onClick={handleImport}>Import</button>
    </>
  )
}
