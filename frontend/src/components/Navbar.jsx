import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/NVA4GET.svg';
import { Dropdown, Space, Badge } from 'antd';
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserState =()=>{
    //check if user is logged in
    const user = localStorage.getItem('user');
    if(user){
      const userdata = JSON.parse(user);
      setUserType('user');
      setUsername(userdata.username || 'user')
    } else{
      setUserType(null);
      setUsername('');
    }
  };

  useEffect(()=>{
    updateUserState();

    const handleStorageChange =()=>{
      updateUserState();
    };
    window.addEventListener('storage',handleStorageChange);

    const handleAuthChange=()=>{
      updateUserState()
    };
    window.addEventListener('authChange', handleAuthChange);

    return ()=>{
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }

  },[]);

  const handleLogout =()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    window.dispatchEvent(new Event('authChange'));
    setUserType(null);
    setUsername('');
    navigate('/');
  }
  const items=[
    {
      label: (
        <span onClick={handleLogout}>
          Logout
        </span>
      ),
      key: '0',
    },
  ];


  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
  {(userType === null &&<nav className="sticky top-0 z-50 bg-[#EBE1D1] border-b border-[#0D4715]/10 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        
        {/* Logo Area */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="transform transition-transform hover:scale-105 active:scale-95">
            <img src={Logo} alt="NVA4GET" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          <div className="flex gap-6">
            <NavLink to="/" label="Home" />
          </div>
          
          <div className="h-6 w-[1px] bg-[#0D4715]/20 mx-2" /> {/* Divider */}

          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="bg-[#0D4715] text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all active:scale-95">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="sm:hidden flex items-center">
          <button 
            className="text-[#0D4715] text-2xl p-2 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Navigation Menu */}
    <div className={`sm:hidden bg-[#EBE1D1] overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-64 border-b border-[#0D4715]/10' : 'max-h-0'}`}>
      <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
        <Link to="/" className="w-full text-center py-3 text-[#0D4715] text-lg font-bold hover:bg-[#0D4715]/5 rounded-lg">Home</Link>
        <Link to="/login" className="w-full">
          <button className="w-full bg-[#0D4715] text-white py-3 rounded-xl font-bold mt-2">
            Login
          </button>
        </Link>
      </div>
    </div>
  </nav>)}

  {(userType === 'user' &&<nav className="sticky top-0 z-50 bg-[#EBE1D1] border-b border-[#0D4715]/10 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        
        {/* Logo Area */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="transform transition-transform hover:scale-105 active:scale-95">
            <img src={Logo} alt="NVA4GET" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          <div className="flex gap-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/todo" label="My Lists" />
          </div>
          
          <div className="h-6 w-[1px] bg-[#0D4715]/20 mx-2" /> {/* Divider */}

          <div className="flex items-center gap-4">
            <Dropdown menu={{ items }} trigger={['click']}>
              <div className='relative text-[#0D4715] text-lg font-bold group py-2 hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  {username}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D4715] transition-all duration-300 group-hover:w-full"></span>
                </Space>
              </div>
        </Dropdown>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="sm:hidden flex items-center">
          <button 
            className="text-[#0D4715] text-2xl p-2 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Navigation Menu */}
    <div className={`sm:hidden bg-[#EBE1D1] overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-64 border-b border-[#0D4715]/10' : 'max-h-0'}`}>
      <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
        <Link to="/" className="w-full text-center py-3 text-[#0D4715] text-lg font-bold hover:bg-[#0D4715]/5 rounded-lg">Home</Link>
        <Link to="/todo" className="w-full text-center py-3 text-[#0D4715] text-lg font-bold hover:bg-[#0D4715]/5 rounded-lg">My Lists</Link>
        <Dropdown menu={{ items }} trigger={['click']}>
              <div className='relative text-[#0D4715] text-lg font-bold group py-2' onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  {username}
                </Space>
              </div>
        </Dropdown>
      </div>
    </div>
  </nav>)}
  </>
  );
}

// Sub-component for desktop links with hover effect
function NavLink({ to, label }) {
  return (
    <Link 
      to={to} 
      className="relative text-[#0D4715] text-lg font-bold group py-2"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D4715] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

export default Navbar;