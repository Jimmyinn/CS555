import { useState, useRef, useEffect } from "react";

export default function TagFilterBar({ allTags, activeTags, setActiveTags }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  return (
    <div className="tag-filter-bar" ref={containerRef}>
      <button
        className="tag-filter-toggle"
        onClick={() => setOpen((p) => !p)}
      >
        Tags {activeTags.length > 0 && `(${activeTags.length})`}
      </button>

      {open && (
        <div className="tag-dropdown">
          {allTags.length === 0 ? (
            <p className="empty-tags">No tags yet</p>
          ) : (
            allTags.map((tag) => (
              <label key={tag} className="tag-option">
                <input
                  type="checkbox"
                  checked={activeTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                {tag}
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}