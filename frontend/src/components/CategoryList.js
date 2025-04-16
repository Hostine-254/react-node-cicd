import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.categoryProduct.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  return (
    <div className='container mx-auto p-2 pl-5 pr-5 lg:mb--2'>
      <div className='flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none'>
        {loading ? (
          categoryLoading.map((_, index) => (
            <div
              key={`category-loading-${index}`}
              className='h-12 w-12 md:w-16 md:h-16 rounded-full bg-slate-200 animate-pulse'
            />
          ))
        ) : (
          categoryProduct.map((product, index) => (
            <Link
              to={`/product-category?category=${product?.category}`}
              key={product?.category}
              className='cursor-pointer'
            >
              <div className='w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
                <img
                  src={product?.productImage[0]}
                  alt={product?.productCategory}
                  className='h-full object-contain mix-blend-multiply hover:scale-110 transition-all'
                />
              </div>
              <p className='text-center text-xs md:text-sm capitalize'>{product?.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryList
