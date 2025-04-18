import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayKSHCurrency from '../helpers/displayCurrency';

function AdminProductCard({data,fetchdata}) {
  const [editProduct,setEditProduct] = useState(false)
  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-28'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} className='mx-auto object-fill h-full'/>
        </div>
        <h1 className='text-ellipsis line-clamp-2 text-xm'>{data.productName}</h1>

        <div>
          <p className='font-semibold text-sm'>
            {displayKSHCurrency(data.sellingPrice)}
          </p>

          <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
            <MdModeEdit />
          </div>
        </div>
      </div>
      
      {
        editProduct && (
          <AdminEditProduct ProductData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
        )
      }

    </div>
  )
}

export default AdminProductCard