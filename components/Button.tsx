import React, { useState } from "react";

function Button({ isDisabled }: { isDisabled?: boolean }) {
  const [count, setCount] = useState(0);

  if (isDisabled) return null;
  return (
    <>
      <button
        data-testid="lmao"
        disabled={isDisabled}
        onClick={() => setCount(count + 1)}
      >
        Click me {count}
      </button>

      <button data-testid="lmao-but" onClick={() => setCount(0)}>
        Reset
      </button>
    </>
  );
}

export default Button;
