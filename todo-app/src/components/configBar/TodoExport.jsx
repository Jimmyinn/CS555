export default function TodoExport({ todos }) {
  function handleExport() {
    const dataStr = JSON.stringify(todos, null, 2);
    const url = URL.createObjectURL(new Blob([dataStr], { type: "application/json" }));

    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <>
      <button onClick={handleExport}>Export</button>
    </>
  )
}