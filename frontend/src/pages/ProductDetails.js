import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayKSHCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

function ProductDetails() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activateImage, setActivateImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: params?.id })
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActivateImage(dataResponse?.data?.productImage[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => setActivateImage(imageURL);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const my_var = "Related Products";

  return (
    <div className='container mx-auto px-4 py-6 lg:px-12'>
      <div className='flex flex-col lg:flex-row gap-6'>

        {/* Images */}
        <div className='flex flex-col-reverse sm:flex-row lg:flex-row-reverse gap-4 lg:gap-6 items-start'>

          {/* Main Product Image */}
          <div className='relative bg-slate-200 w-[260px] h-[260px] sm:w-[300px] sm:h-[260px] rounded'>
            <img
              src={activateImage}
              className='h-full w-full object-contain mix-blend-multiply'
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              alt='Main product'
            />

            {/* Zoom Window */}
            {zoomImage && (
              <div className='hidden lg:block absolute top-0 left-[110%] w-[400px] h-[300px] overflow-hidden rounded bg-slate-200 shadow-lg p-1 z-10'>
                <div
                  className='w-full h-full scale-125 mix-blend-multiply'
                  style={{
                    backgroundImage: `url(${activateImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                />
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className='flex gap-2 sm:flex-col overflow-x-auto sm:overflow-y-auto max-h-[260px] pr-1'>
            {loading
              ? productImageListLoading.map((_, i) => (
                <div key={i} className='h-16 w-16 bg-slate-200 rounded animate-pulse' />
              ))
              : data?.productImage?.map((imgURL, idx) => (
                <div
                  key={imgURL}
                  className='h-16 w-16 bg-slate-200 rounded p-1 cursor-pointer hover:ring-2 hover:ring-orange-400 transition'
                  onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                  onClick={() => handleMouseEnterProduct(imgURL)}
                >
                  <img
                    src={imgURL}
                    alt={`thumbnail-${idx}`}
                    className='w-full h-full object-contain mix-blend-multiply'
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-1 w-full'>
          {loading ? (
            <>
              <p className='bg-slate-200 animate-pulse h-6 w-1/3 rounded-full'></p>
              <h2 className='text-2xl font-medium h-7 bg-slate-200 animate-pulse w-full rounded'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 animate-pulse h-6 w-1/4 rounded'></p>
              <div className='flex gap-2 mt-2'>
                <div className='bg-slate-200 animate-pulse h-6 w-20 rounded'></div>
                <div className='bg-slate-200 animate-pulse h-6 w-16 rounded'></div>
              </div>
              <div className='bg-slate-200 animate-pulse h-32 w-full rounded mt-2'></div>
            </>
          ) : (
            <>
              <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit text-sm'>{data?.brandName}</p>
              <h2 className='text-2xl font-semibold'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-orange-400 flex items-center gap-1 my-1'>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
              </div>

              <div className='flex items-center gap-3 font-medium my-2'>
                <p className='text-red-600 text-xl'>{displayKSHCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-400 line-through text-sm'>{displayKSHCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3 mt-2 flex-wrap'>
                <button
                  className='border-2 border-orange-400 text-orange-400 font-medium rounded px-4 py-1 hover:bg-orange-500 hover:text-white transition'
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy
                </button>
                <button
                  className='bg-orange-400 text-white font-medium border-2 border-orange-400 rounded px-4 py-1 hover:text-orange-400 hover:bg-white transition'
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>

              <div className='mt-4'>
                <p className='text-slate-600 font-medium mb-1'>Description:</p>
                <p className='text-sm text-slate-700'>{data?.description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {data.category && (
        <div className='mt-10'>
          <CategoryWiseProductDisplay category={data.category} heading={my_var} />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
