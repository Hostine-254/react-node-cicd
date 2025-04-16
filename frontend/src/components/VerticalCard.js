import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayKSHCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

function VerticalCard({ loading, data = [] }) {
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-4 md:px-8 transition-all'>
      {loading ? (
        loadingList.map((_, index) => (
          <div key={index} className='bg-white rounded-md shadow-md overflow-hidden'>
            <div className='bg-slate-200 h-32 animate-pulse'></div>
            <div className='p-3'>
              <h2 className='bg-slate-200 h-6 w-3/4 rounded-md mb-2 animate-pulse'></h2>
              <p className='bg-slate-200 h-4 w-2/3 rounded-md mb-4 animate-pulse'></p>
              <div className='flex gap-2 mb-4'>
                <p className='bg-slate-200 h-6 w-1/2 rounded-md animate-pulse'></p>
              </div>
              <button className='w-full bg-slate-200 h-8 rounded-full animate-pulse'></button>
            </div>
          </div>
        ))
      ) : (
        data.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product?._id}`}
            className='bg-white rounded-md shadow-md overflow-hidden'
            onClick={scrollTop}
          >
            <div className='bg-slate-200 h-28 flex justify-center items-center'>
              <img
                src={product.productImage[0]}
                alt={product.productName}
                className='object-contain h-24 w-24 hover:scale-105 transition-all duration-300'
              />
            </div>
            <div className='p-3'>
              <h2 className='font-medium text-base text-black truncate'>{product?.productName}</h2>
              <p className='text-sm text-slate-500 capitalize'>{product?.category}</p>
              <div className='flex gap-2 mt-2'>
                <p className='text-red-500 font-medium'>{displayKSHCurrency(product?.sellingPrice)}</p>
                <p className='text-xs text-slate-500 line-through'>{displayKSHCurrency(product?.price)}</p>
              </div>
              <button
                className='w-full bg-orange-400 hover:bg-orange-500 text-white py-0.5 mt-3 rounded-full transition-colors'
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default VerticalCard;
