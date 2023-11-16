// ThemeColoer.jsx
import React, { useState } from "react";

const ThemeColor = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      document.body.classList.toggle("dark-mode", !prevDarkMode);
      return !prevDarkMode;
    })
  }

  return (
    <div className="theme-color-toggle">
      <label>
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} style={{display: "none"}} />
        <span className="icon" role="img" aria-label="Theme Icon">{
            darkMode ?  "🌞": "🌜" 
        }</span>
      </label>
    </div>
  );
};

export default ThemeColor;
