const FILTERS = ["all", "active", "completed"];

export default function TodoFilter({ filter, onFilter }) {
    return (
        <div className="filter-row">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    onClick={() => onFilter(f)}
                >
                    {f.toUpperCase()}
                </button>
            ))}
        </div>
    );
}