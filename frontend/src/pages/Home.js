import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

function Home() {
  return (
    <div className='bg-white'>
      {/* Outer container with consistent spacing */}
      <div className="container mx-auto px-6 space-y-2">
        <CategoryList />
        <BannerProduct />

        <HorizontalCardProduct category="airpodes" heading="Top's Airpodes" />
        <HorizontalCardProduct category="camera" heading="Popular Cameras" />
        <VerticalCardProduct category="mobiles" heading="Mobiles" />
      </div>
    </div>
  )
}

export default Home
