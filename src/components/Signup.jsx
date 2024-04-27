import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form action="">
        <input type="text" placeholder="Enter Name"/>
        <input type="email" name="" placeholder="Enter Email" />
        <input type="password" name="" id="" placeholder="Enter Password"/>
        <button type="submit">Submit</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Signup;
