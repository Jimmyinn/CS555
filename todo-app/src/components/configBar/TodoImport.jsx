export default function TodoImport({setTodos}) {
  function handleImport(e) {
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
      <button onClick={handleImport}>Import</button>
    </>
  )
}