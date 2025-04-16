import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayKSHCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

function CategoryWiseProductDisplay({ category, heading }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(12).fill(null)
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

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{heading}</h2>

      <div
        ref={scrollElement}
        className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 md:gap-6 overflow-x-auto scrollbar-none"
      >
        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={`loading-${index}`}
              className="bg-white rounded-md shadow p-2 w-full animate-pulse"
            >
              <div className="h-24 mb-3 rounded" />
              <div className="h-4 bg-slate-200 rounded mb-2" />
              <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-full" />
            </div>
          ))
        ) : (
          data.map((product) => (
            <Link
              to={`/product/${product?._id}`}
              key={product?._id}
              onClick={scrollTop}
              className="bg-white rounded-md shadow hover:shadow-md transition-transform hover:-translate-y-1 p-3 flex flex-col"
            >
              <div className="h-24 flex items-center justify-center mb-3">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="object-scale-down h-full mix-blend-multiply transition-transform hover:scale-105"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium text-sm md:text-base line-clamp-1 text-gray-800">
                  {product?.productName}
                </h3>
                <p className="text-xs text-slate-500 capitalize">{product?.category}</p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-500 font-semibold">
                    {displayKSHCurrency(product?.sellingPrice)}
                  </span>
                  <span className="line-through text-xs text-gray-400">
                    {displayKSHCurrency(product?.price)}
                  </span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product?._id)}
                  className="mt-2 text-xs bg-orange-500 hover:bg-orange-600 text-white py-1 rounded-full"
                >
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

export default CategoryWiseProductDisplay
