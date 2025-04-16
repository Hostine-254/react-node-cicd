import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import { FaFrownOpen } from "react-icons/fa";
import VerticalCard from '../components/VerticalCard';

function SearchProduct() {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto px-4 md:px-10 py-6">
      {loading && (
        <p className="text-center text-base md:text-lg text-gray-600">Searching products...</p>
      )}

      {!loading && (
        <div className="mb-6">
          <p className="text-sm md:text-base text-gray-700 font-semibold">
            Search Results: <span className="text-black">{data.length}</span>
          </p>
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="bg-white p-6 rounded text-center text-gray-500 flex flex-col items-center gap-2 border border-gray-200 shadow-sm">
          <FaFrownOpen size={28} className="text-orange-400" />
          <p className="text-sm md:text-base">Oops! No products matched your search.</p>
        </div>
      )}

      {!loading && data.length !== 0 && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
}

export default SearchProduct;
