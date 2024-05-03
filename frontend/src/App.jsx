import {Routes, Route, Navigate } from 'react-router-dom';
import { Form } from './modules/Form';
import { Dashboard } from './modules/Dashboard';
import './App.css';

// const ProtectedRoute = ({ children }) => {
//   const isloggedIn = false; 

//   if (!isloggedIn) {
//     return <Navigate to={'/sign_in'} />;
//   } else if (isloggedIn && ['/sign_in/', '/sign_up/'].includes(window.location.pathname)) {
//     return <Navigate to={'/'} />
//   }

//   return children;
// }



function App() {
  return (
  
    <Routes>
      <Route path='/' element={
          <Dashboard />
      }></Route>
      <Route path='/sign_in' element={
          <Form isSignInPage={true}/>
      }></Route> 
      <Route path='/sign_up' element={
          <Form isSignInPage={false}/>
      }/> 
    </Routes>

  );
}

export default App;
