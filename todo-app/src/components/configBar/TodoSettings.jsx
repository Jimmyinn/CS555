import { useState, useEffect } from "react";

//const [showSettings, setShowSettings] = useState(false);

export default function TodoSettings({ openSettings }) {
  return (
    <button onClick={openSettings}>Settings</button>
  );
}