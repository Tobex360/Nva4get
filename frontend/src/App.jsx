import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route path='/' element={<Landing />} />
       <Route path='register' element={<Register />} />
       <Route path='login' element={<Login />} />
      </Routes>
    </Router>

    
  )
}

export default App