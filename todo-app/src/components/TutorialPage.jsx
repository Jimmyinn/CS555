export default function TutorialPage({ goBack }) {
  const steps = [
    { title: "Adding Tasks", desc: "Type in the top input bar and press \"Add\" to add a task. You can also add a description for extra detail." },
    { title: "Using Tags", desc: "Click a task to expand it, then add tags (up to 5). Click tags in the header to filter your list." },
    { title: "Subtasks", desc: "Inside an expanded task, add subtasks to break down big goals into smaller steps." },
    { title: "Data Management", desc: "Head to Settings to Export your list as a JSON file or Import a previous backup." },
  ];

  return (
    <>
      <div className="header-top">
        <h1 className="title">HOW TO USE</h1>
      </div>

      <button className="clear-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="settings-card">
        {steps.map((step, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '5px' }}>{step.title}</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{step.desc}</p>
            {index < steps.length - 1 && <hr className="divider" />}
          </div>
        ))}
      </div>
    </>
  );
}