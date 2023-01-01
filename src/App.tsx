import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/main.css";
import NewTab from "./newtab";

const init = () => {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Cannot find AppContainer");
  }
  const root = createRoot(appContainer);
  console.log(appContainer)
  root.render(<NewTab/>);
};

init();