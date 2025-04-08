import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayKSHCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  }

  const handleLoading = async() =>{
    await fetchData()
  }

  useEffect(() => {
    setLoading(true)
    handleLoading();
    setLoading(false)
  }, [])

 const increaseQty = async(id,qty)=>{
    const response = await fetch(SummaryApi.updateCartProduct.url,{
      method : SummaryApi.updateCartProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      },
      body : JSON.stringify(
          {
            _id : id,
            quantity : qty + 1
          }
      )
    })

    const responseData = await response.json()

    if(responseData.success){
      fetchData()
      console.log("Its working....!!!")
    }
 }

 const decreaseQty = async(id,qty)=>{
    if(qty >= 2){
      const response = await fetch(SummaryApi.updateCartProduct.url,{
        method : SummaryApi.updateCartProduct.method,
        credentials : 'include',
        headers : {
          "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {
              _id : id,
              quantity : qty - 1
            }
        )
      })
    
      const responseData = await response.json()
    
      if(responseData.success){
        fetchData()
      }
    }
}

const deleteCartProduct = async(id)=>{
  const response = await fetch(SummaryApi.deleteCartProduct.url,{
    method : SummaryApi.deleteCartProduct.method,
    credentials : 'include',
    headers : {
      "content-type" : 'application/json'
    },
    body : JSON.stringify(
        {
          _id : id
        }
    )
  })

  const responseData = await response.json()

  if(responseData.success){
    fetchData()
    context.fetchUserAddToCart()
  }
}

const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice),0)

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white p-5">...!!!Basket Empty!!!...</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/**view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el,index) => {
                return (
                  <div
                    key={el + "Add to Cart Loading"+index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse"
                  ></div>
                );
              }): 
                data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add to Cart Loading"}
                    className="w-full bg-white h-38 my-2 border border-slate-300
                    rounded grid grid-cols-[128px,1fr]">
                    <div className="w-28 h-32 mt-2 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                      </div>
                      <div className="px-4 py-2 relative">
                        {/**delete product */}
                        <div className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={()=>deleteCartProduct(product?._id)}>
                            <MdDelete />
                        </div>
                        <h2 className="text-lg text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                        <p className="capitalize text-slate-400">{product?.productId?.category}</p>
                        <div className="flex items-center md:flex-row justify-between flex-col">
                            <p className="text-red-600 font-medium text-xm">{displayKSHCurrency(product?.productId?.sellingPrice)}</p>
                            <p className="text-slate-600 font-semibold text-xm">{displayKSHCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded" onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                          <span>{product?.quantity}</span>
                          <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded" onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                        </div>
                      </div>
                  </div>
                );
              })}
        </div>

        {/**Summary */}
        {
          data[0] && (
            <div className="mt-5 w-full max-w-sm md:mt-10">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-white">
                <h2 className="text-white bg-orange-500 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 mb-7 mt-3 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 mb-3 font-medium text-lg text-slate-600">
                    <p>Total Price</p>
                    <p>{displayKSHCurrency(totalPrice)}</p>
                </div>

                <button className="bg-green-600 p-2 text-white w-full mt-2">Payment</button>
            </div>
          )}
            </div>
          )
        }
        
      </div>
    </div>
  );
}

export default Cart;
