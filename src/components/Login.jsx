
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container">
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder="Enter User Name"/>
        <input type="password" name="" id="" placeholder="Enter Password"/>
        <button type="submit">Login</button>
      </form>
        <p>Dont have an account? <Link to="/signup">Sign Up</Link></p>
      
    </div>
  );
};

export default Login;
