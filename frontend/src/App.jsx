import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Todo from './pages/Todo/Todo';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route path='/' element={<Landing />} />
       <Route path='/register' element={<Register />} />
       <Route path='/login' element={<Login />} />
       <Route path='/todo' element={<Todo />} />
      </Routes>
    </Router>

    
  )
}

export default App