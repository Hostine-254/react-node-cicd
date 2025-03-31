import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayKSHCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

function HorizontalCardProduct({category,heading}) {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const[scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }

    const fetchData = async() =>{
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setLoading(false)

      setData(categoryProduct?.data)

    }

    useEffect(()=>{
      fetchData()
    },[])

    const scrollRight = () =>{
      scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
      scrollElement.current.scrollLeft -= 300
    }

  return (

    <div className='container mx-auto px-4 my-4 relative'>

        <h2 className='text-xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-4 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

          {
            loading ? (
              loadingList.map((product,index)=>{
                return(
                  <div className='flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-full p-4 min-w-[115px] md:min-w-[135px] animate-pulse'>
                        
  
                    </div>
                    <div className='p-4 grid w-full gap-2'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 animate-pulse rounded-full'></h2>
                      <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                      <div className='flex gap-3 w-full'>
                        <p className='text-red-500 text-medium pl-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                        <p className='edited-thru-line text-xs p-1 text-slate-500 w-full animate-pulse rounded-full'></p>
                      </div>
                      <button className='text-sm text-white px-1 py-1 rounded-full w-full bg-slate-200 animate-pulse'></button>
                    </div>
                  </div>
                )
              })
            ) : (
              data.map((product,index)=>{
                return(
                  <Link to={"product/"+product?._id} className='flex w-full min-w-[360px] md:min-w-[360px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-full p-3 min-w-[115px] md:min-w-[135px]'>
                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
  
                    </div>
                    <div className='p-3 grid'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.category}</p>
                      <div className='flex gap-3'>
                        <p className='text-red-500 pl-1'>{displayKSHCurrency(product?.sellingPrice)}</p>
                        <p className='edited-thru-line text-xs p-1 text-slate-500'>{displayKSHCurrency(product?.price)}</p>
                      </div>
                      <button className='text-sm bg-orange-400 hover:bg-orange-500 text-white px-1 py-1 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                    </div>
                  </Link>
                )
              })
            )
            
          }
        </div>

        
    </div>
  )
}

export default HorizontalCardProduct