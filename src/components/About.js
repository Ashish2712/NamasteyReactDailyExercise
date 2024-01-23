import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <h2>Welcome to the new series of React!</h2>
      <User name={"Ashish Singh (function)"} />
      <UserClass  name={"Ashish Singh (class)"}/>
    </div>
  );
};

export default About;