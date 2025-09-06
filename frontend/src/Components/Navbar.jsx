import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';


export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const Logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})

  }

  return (
    <div className='flex items-center justify-between py-5 px-4 font-medium relative'>
      {/* Logo */}
      <img src={assets.logo} alt='Logo' className='w-28' />

      {/* Desktop Navigation */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['/', '/about', '/collection', '/contact'].map((path, i) => (
          <NavLink key={i} to={path} className='flex flex-col items-center gap-1'>
            <p>{path === '/' ? 'HOME' : path.slice(1).toUpperCase()}</p>
            <hr className='w-2/4 border-none h-[1.7px] bg-gray-700 hidden' />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className='flex items-center gap-4'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='Search Icon' />

        {/* Profile Dropdown */}
        <div className='group relative'>

          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt='Profile Icon' />

          {token &&
            <div className='absolute top-4 right-0 group-hover:block hidden absolute right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-500 rounded '>
                <p className='cursor-pointer hover:text-black z-10'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black z-10'>Orders</p>
                <p onClick={Logout} className='cursor-pointer hover:text-black z-10'>Logout</p>
              </div>
            </div>
          }

        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5' alt='Cart Icon' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>

        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='cursor-pointer w-5 sm:hidden'
          alt='Menu Icon'
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-all duration-300 ${visible ? 'w-full' : 'w-0'
          } overflow-hidden`}
      >
        <div
          className={`ablsolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'
            }`}
        >
          <div className='flex flex-col text-gray-700'>
            <div className='flex flex-col text-gray-600'>
              <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="dropdown Icon" />
                <p>Back</p>
              </div>
              <NavLink className="py-2 pl-6 border" to='/' onClick={() => setVisible(false)}>HOME</NavLink>
              <NavLink className="py-2 pl-6 border" to='/about' onClick={() => setVisible(false)}>ABOUT</NavLink>
              <NavLink className="py-2 pl-6 border" to='/collection' onClick={() => setVisible(false)}>COLLECTION</NavLink>
              <NavLink className="py-2 pl-6 border" to='/contact' onClick={() => setVisible(false)}>CONTACT</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}