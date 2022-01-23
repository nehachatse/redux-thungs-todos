import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [state, setState] = useState("");

  return (
    <div>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Add todo"
      />
      <button
        onClick={async () => {
          await onAdd(state);
          setState("");
        }}
      >
        Add
      </button>
    </div>
  );
}
