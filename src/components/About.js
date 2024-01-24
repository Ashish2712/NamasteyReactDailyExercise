import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends Component{

    constructor(props){
        super(props);

        console.log("Parent constructor is called!")
    }


componentDidMount(){
    console.log("Parent component did mount is called!");
}

render(){
    console.log("parent render is called!")
    return (
        <div>
          <h1>About</h1>
          <h2>Welcome to the new series of React!</h2>
          {/* <User name={"Ashish Singh (function)"} /> */}
          <UserClass  name={"Ashish Singh (class)"}/>
        </div>
      );
}
}


export default About;