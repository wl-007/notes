import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import StateDemo from "./classComponent/StateDemo";
// import PropsDemo from "./classComponent/PropsDemo";
// import EventDemo from "./classComponent/EventDemo";

import {UseStateDemo} from "./functionComponent/UseStateDemo";
import PropsDemo from "./functionComponent/PropsDemo";
import EventDemo from "./functionComponent/EventDemo";
import ListDemo from "./functionComponent/ListDemo";
import FormDemo from "./functionComponent/FormDemo";
import {UseReducerDemo} from "./functionComponent/UseReducerDemo";

import Demo from "./status/JotaiDemo/Basic"
import Demo2 from "./status/JotaiDemo/BasicBorther"
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <StateDemo />
      <PropsDemo />
      <EventDemo /> */}

      {/* <UseStateDemo onChange={()=>{}}/>
      <PropsDemo />
      <EventDemo />
      <ListDemo />
      <FormDemo />
      <UseReducerDemo /> */}

      <Demo></Demo>
      <Demo2></Demo2>
    </>
  );
}

export default App;
