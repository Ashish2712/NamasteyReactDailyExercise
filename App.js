import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => Object => HTMLElement(render)
const elem = <div> React Element</div>

// JSX - HTML-like or XML-like syntax (JSX code is transpiled
// before it reached to the JS Engine) - PARCEL - Babel(do the transpilation)
const Heading = () => (
  <h1 className="heading" tabIndex="1">
  {elem}
    Namaste React using JSX 🚀
  </h1>
);


const number = 10000;
// Component Composition -> putting one component inside another component
const HeadingComponent = () => (
  <div id="container">

     {Heading()}
     <Heading />
     <Heading></Heading>
     {number}
  <h2 className="heading">It's a React functional Component</h2>
  </div>
);

console.log(HeadingComponent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
