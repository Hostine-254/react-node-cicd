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
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalItems = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const totalPrice = data.reduce((preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice, 0);

  return (
    <div className="container mx-auto px-8 lg:px-20 py-6 overflow-x-hidden">
      <div className="text-center text-lg mb-4">
        {data.length === 0 && !loading && <p className="bg-white p-4 text-gray-600">...!!!Basket Empty!!!...</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 overflow-x-hidden">
        {/* Product View */}
        <div className="w-full max-w-2xl space-y-4">
          {loading
            ? loadingCart.map((el, index) => (
                <div key={el + "Add to Cart Loading" + index} className="w-full bg-slate-200 h-28 my-3 border border-slate-300 animate-pulse rounded-md"></div>
              ))
            : data.map((product, index) => (
                <div
                  key={product?._id + "Add to Cart Loading"}
                  className="w-full bg-white rounded-lg shadow-md flex items-center space-x-4 p-3 border border-slate-300 relative"
                >
                  {/* Move the delete icon to top-right */}
                  <div
                    className="absolute top-2 right-2 text-red-600 cursor-pointer hover:text-white hover:bg-red-600 p-2 rounded-full"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete size={20} />
                  </div>

                  <div className="w-20 h-20 bg-slate-200 flex justify-center items-center rounded-md">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-contain"
                      alt={product?.productId?.productName}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-md font-semibold text-black line-clamp-1">{product?.productId?.productName}</h2>
                    </div>
                    <p className="capitalize text-slate-400 text-sm mb-2">{product?.productId?.category}</p>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-red-600 font-medium text-sm">{displayKSHCurrency(product?.productId?.sellingPrice)}</p>
                      <p className="text-slate-600 text-sm">{displayKSHCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full text-xs"
                        onClick={() => decreaseQty(product?._id, product?.quantity)}
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full text-xs"
                        onClick={() => increaseQty(product?._id, product?.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Cart Summary */}
        {data[0] && (
          <div className="w-full max-w-sm mt-6 lg:mt-0">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse rounded-md">
                <h2 className="text-white bg-orange-500 p-4">Summary</h2>
              </div>
            ) : (
              <div className="h-36 bg-white rounded-md shadow-md">
                <h2 className="text-white bg-orange-500 p-4 text-lg">Summary</h2>
                <div className="flex justify-between px-4 mb-3 mt-4 text-md font-medium text-slate-600">
                  <p>Items</p>
                  <p>{totalItems}</p>
                </div>

                <div className="flex justify-between px-4 mb-4 text-md font-medium text-slate-600">
                  <p>Total Price</p>
                  <p>{displayKSHCurrency(totalPrice)}</p>
                </div>

                <button className="bg-green-600 p-3 text-white w-full mt-4 rounded-md text-sm hover:bg-green-700 transition-all">Proceed to Payment</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
