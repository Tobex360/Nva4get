import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/NVA4GET.svg';
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';



function Navbar() {
    const [open, setOpen ]= useState(false);
  return (
    <>
        <div>
      <div className='flex bg-[#EBE1D1] justify-between p-2 text-l items-center'>
        <div><Link to='/'><img src={Logo} alt="" /></Link></div>
        {/* Desktop nav */}
        {(<div className='hidden sm:flex gap-3 text-white text-xl text-bold mr-4'>
          <Link to="/" className='fl'>Home</Link>
          <Link to="/" className='fl'>Features</Link>
          <Link to="/" className='fl'>Login</Link>
        </div>)}
          <button 
          className='flex sm:hidden text-white'
          onClick={()=>{setOpen(!open)}}>
            {!open ?<MenuOutlined /> : <CloseOutlined />}
            </button>
      </div>
      {/* Mobile nav */}
        {open &&(<div className='flex flex-col sm:hidden gap-3 bg-yellow-700 text-white items-center text-xl text-bold'>
          <Link to="/" className='fl'>Home</Link>
          <Link to="/"className='fl'>Features</Link>
          <Link to="/"className='fl'>Login</Link>
        </div>)}
    </div>
    </>
  )
}

export default Navbar