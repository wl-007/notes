import React, {useState} from "react";

const ThemeContext = React.createContext("light");

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button style={{ backgroundColor: theme }}>{theme}</button>;
}
function UseContext(props) {
  const [themeVal, setThemeVal] = useState("light");
  return (
    <ThemeContext.Provider value={themeVal}>
      <div onClick={() => setThemeVal(themeVal === "light" ? "dark" : "light")}>UseContext</div>
      {themeVal}
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export default UseContext;
