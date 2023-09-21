import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import User from './pages/User';
import Login from './pages/Login';
import Register from './pages/Register';
import Forget from './pages/Forget';
import PrivateRoute from './PrivateRoute';
import Verify from './pages/Verify';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route>
        <Route path="/" element={<PrivateRoute element={<User />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/verify" element={<Verify />} />
        </Route>
        </Routes>
    </Router>
  );
};

export default App;
