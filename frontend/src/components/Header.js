import React, {useContext, useState} from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

function Header() {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchInput?.search?.split("=")[1])

  console.log("SearchInput",searchInput?.search?.split("=")[1])


  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }

  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full edit-header-index'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='pt-6 pr-6'>
          <Link to={"/"}>
            <Logo w={140} h={70}/>
          </Link>
        </div>

        <div className='hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Search items here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-orange-400 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center' onClick={() =>setMenuDisplay(preve => !preve)}>
            
            {
              user?._id && (
                <div className='text-3xl cursor-pointer'>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                    ) : ( <FaRegCircleUser /> )
                  }
                </div>
       
              )
            }


            {
              menuDisplay && (
                <div className='hidden md:block absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={'/admin-panel/all-products'} className='whitespace-nowrap bg-slate-100 p-2' onClick={() =>setMenuDisplay(preve => preve)}>Admin space</Link>

                      )
                    }
          
                  </nav>
               </div>

              )
            }
        
          </div>
          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                  <span><HiShoppingCart /></span>
                  <div className='bg-orange-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2.5 -right-3.5'>
                    <p className='text-xs'>{context?.cartProductCount}</p>
                  </div>
              </Link>
            )
          }
          

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout}>Logout</button>
              )
              :
              <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-orange-400 hover:bg-orange-500'>Login</Link>
            }
            
          </div>

        </div>

      </div>
    </header>
  )
}

export default Header