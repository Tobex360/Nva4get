import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '../src/pages/Landing/Landing';
import Navbar from '../src/components/Navbar';
import Register from '../src/pages/auth/Register';
import Login from '../src/pages/auth/Login';
import Todo from '../src/pages/Todo/Todo';
import Footer from '../src/components/Footer';
import BackToTop from '../src/components/BackToTop';





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
      <Footer />
      <BackToTop />
    </Router>

    
  )
}

export default App