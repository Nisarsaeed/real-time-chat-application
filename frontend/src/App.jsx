import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Form } from './modules/Form';
import { Dashboard } from './modules/Dashboard';
import PropTypes from 'prop-types'
import './App.css';

const ProtectedRoute = ({ children }) => {
  let isLoggedIn = false;
  const location = useLocation();

  if (localStorage.length>=2) {
    isLoggedIn=true;
  }

  if (!isLoggedIn && location.pathname !== '/sign_in' && location.pathname !== '/sign_up') {
    return <Navigate to={'/sign_in'} />;
  }
  else if (isLoggedIn && (location.pathname === '/sign_in' || location.pathname === '/sign_up')) {
    return <Navigate to={'/'} />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children : PropTypes.any
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route path='/sign_up' element={
        <ProtectedRoute>
          <Form isSignInPage={false} />
        </ProtectedRoute>} />
      <Route path='/sign_in' element=
        {<ProtectedRoute>
          <Form isSignInPage={true} />
        </ProtectedRoute>} />
    </Routes>
  );
}

export default App;
