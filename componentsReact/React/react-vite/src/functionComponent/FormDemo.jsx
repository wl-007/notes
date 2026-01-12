import React from "react";

export default function FormDemo() {
  const [name, setName] = React.useState("");
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}
