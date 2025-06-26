// File: /pixel-pm/src/components/Button.jsx
import React from "react";

export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-lg font-bold rounded border-2 border-black shadow-md hover:shadow-lg active:scale-95 transition-transform duration-100 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
