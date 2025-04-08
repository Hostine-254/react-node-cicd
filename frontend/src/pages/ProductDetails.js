import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayKSHCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

function ProductDetails() {

  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })

  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activateImage,setActivateImage] = useState("")
  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  console.log("product id",params)

  const fetchProductDetails = async()=>{

    setLoading(true)

    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })

    setLoading(false)
   

    const dataResponse = await response.json()
    
    setActivateImage(dataResponse?.data?.productImage[0])

    setData(dataResponse?.data)

  }
  
  var my_var = "Uknown Products"
  
  
  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL) =>{
    setActivateImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect() 
    console.log("Coordinate", left,top,width,height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
    
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-y'>

        <div className='mx-7 my-3 min-h-[200px] flex flex-col lg:flex-row gap-4'>
            {/**Product image*/}
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
                  <img src={activateImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                  {/**Product Zoom */}
                  {
                    zoomImage && (
                      <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                      <div 
                        className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125'
                        style={{
                          backgroundImage : `url(${activateImage})`,
                          backgroundRepeat : 'no-repeat',
                          backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                          }}
                        >

                      </div>
                  </div>
                    )
                  }
                  
              </div>

              <div className='h-full'>
                {
                loading ? (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      productImageListLoading.map((el,index) =>{
                        return(
                          <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                          </div>
                        )
                      })
                    }
                  </div>
                  
                ) : (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      data?.productImage?.map((imgURL,index) =>{
                        return(
                          <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                          </div>
                        )
                      })
                    }
                  </div>
                )
                }
              </div>

            </div>

            {/**Product details*/}
            {
              loading ? (
                <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-2xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

                <div className='text-red-600 bg-slate-200 animate-pulse h-6 lg:h-8 flex items-center gap-1 w-full'>
                  
                </div>

                <div className='flex items-center gap-2 font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                  <p className='text-red-600 text--2xl bg-slate-200 w-full'></p>
                  <p className='text-slate-400 line-through text--4xl bg-slate-200 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                  <p className='h-10 lg:h-12 bg-slate-200 rounded animate-pulse w-full'></p>
                </div>
                </div>
              ) : (
                <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-2xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-orange-400 flex items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                <div className='flex items-center gap-2 font-medium my-1'>
                  <p className='text-red-600 text--2xl'>{displayKSHCurrency(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through text--4xl'>{displayKSHCurrency(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button className='border-2 border-orange-400 rounded px-3 py-1 min-w-[120px] text-orange-400 font-medium hover:bg-orange-500 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                  <button className='border-2 border-orange-400 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-orange-400 hover:text-orange-400 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Description:</p>
                  <p>{data?.description}</p>
                </div>
                </div>
              )
            }

        </div>

        {
          data.category && (
            <CategoryWiseProductDisplay category={data.category} heading={my_var}/>
          )
        }

    </div>
    
  )
}

export default ProductDetails