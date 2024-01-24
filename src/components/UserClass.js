import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            count : 0,
        }

        console.log("child constructor is called!")
    }

    componentDidMount(){
        console.log("Child componentDidMount is called!")
    }

    render() {
        console.log("Child render is called!");
        const {name} = this.props;
        const {count, count2} = this.state
        return(
            <div className="user-card">
                <h1>Count: {count}</h1>
                <button onClick={() =>{
                // NEVER UPDATE STATE VARIABLE DIRECTLY
                this.setState(
                    {count: this.state.count + 1}
                );
                }}>Count Increase</button>
                <h2>Name: {name}</h2>
                <h3>Location: Noida </h3>
                <h4>Social Media: Not available</h4>
            </div>
        );
    }
}


export default UserClass