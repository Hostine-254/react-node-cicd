import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

function Header() {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1] || '');

  const handleLogout = async () => {
    const res = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });
    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : '/search');
  };

  return (
    <header className='h-16 shadow-sm bg-white fixed top-0 left-0 right-0 z-50'>
      <div className='h-full container mx-auto px-4 lg:px-8 flex items-center justify-between'>
        
        {/* Logo */}
        <Link to="/" className='flex items-center pt-2'>
          <Logo w={130} h={60} />
        </Link>

        {/* Search */}
        <div className='hidden md:flex items-center w-full max-w-md border border-gray-300 rounded-full overflow-hidden focus-within:shadow-md mx-4'>
          <input
            type="text"
            placeholder="Search items here..."
            value={search}
            onChange={handleSearch}
            className='w-full px-3 py-1 outline-none text-sm'
          />
          <div className='bg-orange-400 text-white px-4 py-2 text-lg'>
            <GrSearch />
          </div>
        </div>

        {/* Right Controls */}
        <div className='flex items-center gap-6 pr-2'>
          {/* Profile / User Dropdown */}
          {user?._id && (
            <div className='relative cursor-pointer' onClick={() => setMenuDisplay(!menuDisplay)}>
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className='w-10 h-10 rounded-full object-cover border border-gray-300'
                />
              ) : (
                <FaRegCircleUser className='text-2xl text-gray-700' />
              )}

              {/* Dropdown Menu */}
              {menuDisplay && (
                <div className='absolute top-12 right-0 w-48 bg-white border shadow-md rounded-md z-50 text-sm'>
                  <ul className='py-2'>
                    <li>
                      <Link to="/account" className='block px-4 py-2 hover:bg-gray-100'>My Account</Link>
                    </li>
                    <li>
                      <Link to="/orders" className='block px-4 py-2 hover:bg-gray-100'>My Orders</Link>
                    </li>
                    <li>
                      <Link to="/wishlist" className='block px-4 py-2 hover:bg-gray-100'>Wishlist</Link>
                    </li>
                    <li>
                      <Link to="/support" className='block px-4 py-2 hover:bg-gray-100'>Support</Link>
                    </li>
                    {user?.role === ROLE.ADMIN && (
                      <li>
                        <Link to="/admin-panel/all-products" className='block px-4 py-2 hover:bg-gray-100'>Admin Panel</Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout} className='w-full text-left px-4 py-2 hover:bg-gray-100'>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Cart Icon */}
          {user?._id && (
            <Link to="/cart" className='relative text-2xl text-gray-700'>
              <HiShoppingCart />
              <span className='absolute -top-2 -right-3 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {context?.cartProductCount || 0}
              </span>
            </Link>
          )}

          {/* Login Button */}
          {!user?._id && (
            <Link
              to="/login"
              className='px-4 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-all'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
