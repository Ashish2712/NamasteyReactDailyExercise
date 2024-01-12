import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => Object => HTMLElement(render)

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🚀"
);

console.log(heading);

// JSX - HTML-like or XML-like syntax (JSX code is transpiled before it reached to the JS Engine) - PARCEL - Babel(do the transpilation)
const jsxHeading = (
  <h1 className="heading" tabIndex="1">
    Namaste React using JSX 🚀
  </h1>
);

console.log(jsxHeading);

console.log(heading === jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(jsxHeading);
