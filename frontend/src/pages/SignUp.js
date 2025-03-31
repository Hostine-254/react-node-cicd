import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : "",
      profilePic : ""
    })

    const navigate = useNavigate()

    const handleOnChange = (e) =>{
      const { name, value } = e.target

      setData((prev)=>{
        return{
          ...prev,
          [name] : value
        }
      })
    }

    const handleUploadPic = async(e) =>{
      const file = e.target.files[0]
      
      const imagePic = await imageTobase64(file)
      setData((prev)=>{
        return{
          ...prev,
          profilePic : imagePic
        }
      })
    }

    async function handleSubmit(e){
      e.preventDefault()

      if(data.password === data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signUp.url,{
          method : SummaryApi.signUp.method,
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login")
        }

        if(dataApi.error){
          toast.error(dataApi.message)
        }


      }
      else{
        toast.error("Passwords does not match")
      }

    }

    console.log("data login", data)

  return (
    <section id='sign-up'>

        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-xl'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                      <img src={data.profilePic || loginIcons} alt='loginicon'/>
                    </div>
                    <form>
                      <label>
                        <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                          Upload avarta
                        </div>
                        <input type = 'file' className='hidden' onChange={handleUploadPic}/>
                      </label>
                      
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div  className='grid'>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2 rounded-lg'>
                              <input 
                                type='text' 
                                placeholder='Enter Your Name' 
                                name = "name"
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none'/>
                            </div>
                        </div>
                    <div  className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2 rounded-lg'>
                          <input 
                            type='email' 
                            placeholder='Enter email' 
                            name = "email"
                            value={data.email}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none'/>
                        </div>
                    </div>

                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex rounded-lg'>
                          <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Enter password' 
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none'/>
                          <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword ? ( <FaEyeSlash /> ) : ( <FaEye /> )
                                }
                            </span>
                          </div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex rounded-lg'>
                          <input 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            placeholder='Re-type password' 
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none'/>
                          <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword ? ( <FaEyeSlash /> ) : ( <FaEye /> )
                                }
                            </span>
                          </div>
                        </div>
                    </div>

                    <button className='bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block my-6'>Sign Up</button>      

                </form>

                <p className='my-5'>Already have an account? <Link to={'/login'} className='text-orange-400 hover:text-orange-500 hover:underline'>Login</Link></p>

            </div>

        </div>

    </section>
  )
}

export default SignUp