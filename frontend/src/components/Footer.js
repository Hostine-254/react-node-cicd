import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPinterest, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-slate-900 text-white py-10'>
      <div className='container mx-auto px-6'>
        <div className='grid md:grid-cols-5 gap-6'>
          {/* Column 1: Product Categories */}
          <div>
            <h3 className='font-semibold text-sm mb-4'>Shop by Category</h3>
            <ul>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Electronics</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Fashion</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Home & Kitchen</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Books</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Toys & Games</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Sports & Outdoors</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className='font-semibold text-sm mb-4'>Customer Service</h3>
            <ul>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Help & FAQs</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Returns & Exchanges</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Shipping & Delivery</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Contact Us</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Order Tracking</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media & Newsletter */}
          <div>
            <h3 className='font-semibold text-sm mb-4'>Connect with Us</h3>
            <div className='flex space-x-4 mb-4'>
              <a href="#" className='text-gray-300 hover:text-white transition duration-300'>
                <FaFacebook size={16} />
              </a>
              <a href="#" className='text-gray-300 hover:text-white transition duration-300'>
                <FaInstagram size={16} />
              </a>
              <a href="#" className='text-gray-300 hover:text-white transition duration-300'>
                <FaTwitter size={16} />
              </a>
              <a href="#" className='text-gray-300 hover:text-white transition duration-300'>
                <FaLinkedin size={16} />
              </a>
              <a href="#" className='text-gray-300 hover:text-white transition duration-300'>
                <FaPinterest size={16} />
              </a>
              <a href="#" className='text-gray-300 hover:text-white transition duration-300'>
                <FaYoutube size={16} />
              </a>
            </div>

            <h3 className='font-semibold text-sm mb-4'>Newsletter</h3>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-md text-xs w-2/3 bg-gray-800 text-gray-300 border border-gray-700"
              />
              <button type="submit" className="p-2 rounded-r-md bg-green-600 text-white text-xs">Subscribe</button>
            </form>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h3 className='font-semibold text-sm mb-4'>Legal & Policies</h3>
            <ul>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Privacy Policy</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Terms of Service</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Cookie Policy</a></li>
              <li><a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Security & Fraud</a></li>
            </ul>
          </div>

          {/* Column 5: Payment Methods */}
          <div>
            <h3 className='font-semibold text-sm mb-4'>Accepted Payments</h3>
            <div className='flex justify-start space-x-6'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Visa_2011_logo.svg" alt="Visa" className='w-9 h-5' />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Mastercard_Logo.svg" alt="MasterCard" className='w-9 h-5' />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/PayPal_logo.svg" alt="PayPal" className='w-9 h-5' />
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Logo_American_Express.svg" alt="American Express" className='w-9 h-5' />
            </div>
          </div>
        </div>

        {/* Copyright & Additional Links */}
        <div className='text-center mt-8'>
          <p className='text-xs text-gray-300'>&copy; {new Date().getFullYear()} Gygaview. All Rights Reserved.</p>
          <div className='mt-2 flex justify-center space-x-6'>
            <a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Privacy Policy</a>
            <a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Terms of Service</a>
            <a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Returns</a>
            <a href="#" className='text-xs text-gray-300 hover:text-white transition duration-300'>Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
