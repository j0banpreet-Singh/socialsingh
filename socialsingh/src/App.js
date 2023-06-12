import './App.css';
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import {useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user? <Navigate to="/"/>:<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route index element={<RequireAuth><Home/></RequireAuth>} />
          <Route path='/profile/:id' element={<RequireAuth><Profile /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
