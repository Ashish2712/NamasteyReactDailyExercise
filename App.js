/**
 * <div id="parent">
 *      <div id="child">
 *          <h1> It's an H1 tag</h1>
 *           <h2> It's an H2 tag</h2>
 *      </div>
 *      <div id="child2">
 *          <h1> It's an H1 tag</h1>
 *          <h2> It's an H2 tag</h2>
 *      </div>
 * </div>
 *
 * ReactElement(Object) ==> HTML(Browser Understands)
 */

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement("h1", {}, "It's an H1 tag"),
    React.createElement("h2", {}, "It's an H2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "It's an H1 tag"),
    React.createElement("h2", {}, "It's an H2 tag"),
  ]),
]);

// const heading = React.createElement("h1", {id:"heading"}, "Hello world from react");
// h1 => h1 is the tag which decides the heading
// {} => attribute to the tag ex: {id:"heading"} which later on be used to perform some actions by css
// message => message which needs to be printed with h1 tag
// <h1> Hello world from react </h1>

const root = ReactDOM.createRoot(document.getElementById("root")); // creating root element

root.render(parent); // that's how you render the elements on react
console.log(parent);
