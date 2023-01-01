import React from "react";
import { createRoot } from "react-dom/client";
import './assets/main.css';
import TimeZones from './components/TimeZones'
const test = (
  <div>
    <h1>Hello new tab! !!!</h1>
    <TimeZones/>
    <img src="img/bg_1.png" alt="bg"/>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(test);
