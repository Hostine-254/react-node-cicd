import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayKSHCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

function VerticalCard({loading, data = []}) {
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }

  return (
    
    <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,280px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

          {
            loading ? (
              loadingList.map((product,index)=>{
                return(
                  <div className='w-full min-w-[220px] md:min-w-[300px] max-w-[220px] md:max-w-[300px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-36 p-4 min-w-[240px] md:min-w-[135px] flex justify-center items-center animate-pulse'>

  
                    </div>
                    <div className='p-2 grid gap-1'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                      <p className='capitalize text-slate-500'>{product?.category}</p>
                      <div className='flex gap-3'>
                        <p className='text-red-500 text-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                        <p className='edited-thru-line text-xs p-1 text-slate-500 animate-pulse rounded-full bg-slate-200 w-full py-2' ></p>
                      </div>
                      <button className='text-sm text-white px-1 py-2 rounded-full bg-slate-200'></button>
                    </div>
                  </div>
                )
              })

            ) : (
              data.map((product,index)=>{
                return(
                  <Link to={"/product/"+product?._id} className='w-full min-w-[240px] md:min-w-[260px] max-w-[240px] md:max-w-[260px] bg-white rounded-sm shadow'onClick={scrollTop}>
                    <div className='bg-slate-200 h-36 p-4 min-w-[200px] md:min-w-[120px] flex justify-center items-center'>
                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
  
                    </div>
                    <div className='p-2 grid gap-1'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.category}</p>
                      <div className='flex gap-1'>
                        <p className='text-red-500 text-medium p-1'>{displayKSHCurrency(product?.sellingPrice)}</p>
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
  )
}

export default VerticalCard