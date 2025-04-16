import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayKSHCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

function VerticalCardProduct({ category, heading }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(8).fill(null)

  const scrollElement = useRef()
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setData(categoryProduct?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className='container mx-auto px-4 my-8 relative bg-slate-200'>
      <div className="border-b border-gray-200 pb-1 mb-2">
        <h2 className='text-2xl font-bold text-gray-800'>{heading}</h2>
      </div>

      {/* Scroll Buttons */}
      <button 
        className='bg-white/90 backdrop-blur-md shadow-md rounded-full p-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 text-xl text-gray-600 hover:bg-gray-100 hidden md:flex items-center justify-center transition'
        onClick={scrollLeft}
      >
        <FaAngleLeft />
      </button>

      <button 
        className='bg-white/90 backdrop-blur-md shadow-md rounded-full p-2 absolute right-0 top-1/2 -translate-y-1/2 z-10 text-xl text-gray-600 hover:bg-gray-100 hidden md:flex items-center justify-center transition'
        onClick={scrollRight}
      >
        <FaAngleRight />
      </button>

      {/* Products Grid Scrollable */}
      <div 
        className='flex gap-4 overflow-x-auto scroll-smooth scrollbar-none pb-2'
        ref={scrollElement}
      >
        {loading ? (
          loadingList.map((_, idx) => (
            <div key={idx} className='min-w-[250px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-lg shadow animate-pulse flex flex-col overflow-hidden'>
              <div className='bg-slate-200 h-40 w-full'></div>
              <div className='p-3 space-y-2'>
                <div className='bg-slate-300 h-5 rounded-full w-3/4'></div>
                <div className='bg-slate-300 h-4 rounded-full w-1/2'></div>
                <div className='flex gap-2'>
                  <div className='bg-slate-300 h-4 w-1/3 rounded-full'></div>
                  <div className='bg-slate-300 h-4 w-1/3 rounded-full'></div>
                </div>
                <div className='bg-slate-300 h-6 w-full rounded-full'></div>
              </div>
            </div>
          ))
        ) : (
          data.map((product) => (
            <Link
              key={product?._id}
              to={`/product/${product?._id}`}
              className='relative min-w-[250px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 overflow-hidden flex flex-col'
            >
              {/* Discount Badge */}
              {product?.price > product?.sellingPrice && (
                <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium shadow">
                  {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
                </div>
              )}

              {/* Product Image */}
              {/*
              <div className='bg-white h-40 p-4 flex items-center justify-center'>
                <img 
                  src={product.productImage[0]} 
                  alt={product.productName}
                  //className='h-full object-contain transition-transform duration-300 hover:scale-105 mix-blend-multiply'
                  className='h-full max-h-[100px] object-contain transition-transform duration-300 hover:scale-105 mix-blend-multiply'
                />
              </div>*/}
              <div className='bg-white h-28 p-2 flex items-center justify-center'>
                <img 
                  src={product.productImage[0]} 
                  alt={product.productName}
                  className='max-h-[90px] object-contain transition-transform duration-300 hover:scale-105 mix-blend-multiply'
                />
              </div>


              {/* Product Info */}
              <div className='p-3 flex flex-col justify-between flex-grow'>
                <h3 className='text-sm font-semibold text-gray-800 truncate'>{product?.productName}</h3>
                <span className='text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wide w-max'>
                  {product?.category}
                </span>

                <div className='flex items-center gap-2 text-sm mt-1'>
                  <span className='text-red-600 font-semibold'>{displayKSHCurrency(product?.sellingPrice)}</span>
                  <span className='line-through text-xs text-gray-400'>{displayKSHCurrency(product?.price)}</span>
                </div>

                <button 
                  onClick={(e) => handleAddToCart(e, product?._id)}
                  className='flex items-center justify-center gap-2 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-full py-1 px-3 mt-3 transition-all duration-300'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default VerticalCardProduct
