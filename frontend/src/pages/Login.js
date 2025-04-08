import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

function Login() {

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
      email : "",
      password : ""
    })

    const navigate = useNavigate()
    const { fetchUserDetails,fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
      const { name, value } = e.target

      setData((prev)=>{
        return{
          ...prev,
          [name] : value
        }
      })
    }

    async function handleSubmit(e){
      e.preventDefault()

      const dataResponse = await fetch(SummaryApi.signIn.url,{
        method : SummaryApi.signIn.method,
        credentials : "include",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/")
          fetchUserDetails()
          fetchUserAddToCart()
        }

        if(dataApi.error){
          toast.error(dataApi.message)
        } 
    }

    console.log("data login", data)

  return (
    <section id='login'>

        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-xl'>
                <div className='w-20 h-20 mx-auto'>
                    <div>
                      <img src={loginIcons} alt='loginicon'/>
                    </div>
                    
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2 rounded-lg'>
                          <input 
                            type='email' 
                            placeholder='Enter email' 
                            name = "email"
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none'/>
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex rounded-lg'>
                          <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Enter password' 
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none'/>
                          <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword ? ( <FaEyeSlash /> ) : ( <FaEye /> )
                                }
                            </span>
                          </div>
                        </div>

                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-orange-500'>
                        Forgot password ?
                        </Link>
                    </div>

                    <button className='bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 w-full max-w-[130px] rounded-full hover:scale-90 transition-all mx-auto block my-6'>Login</button>      

                </form>

                <p className='my-5'>Create an account? <Link to={'/sign-up'} className='text-orange-400 hover:text-orange-500 hover:underline'>Sign Up</Link></p>

            </div>

        </div>

    </section>
  )
}

export default Login