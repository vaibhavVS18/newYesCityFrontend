"use client"
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-[#9DB2D0] mt-8 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">About YESCITY</h4>
            <p>
              Discover the vibrant cities of India with YESCITY. Explore famous
              places, local foods, and exciting activities. Plan and book your
              trip with ease.
            </p>
            <button className="mt-2 bg-[#003F6E] text-white px-4 py-1 flex items-center justify-center font-bold cursor-pointer rounded-md hover:bg-blue-900 transition">
              Learn More
            </button>
          </div>
          <div>
            <h4 className="font-bold mb-2">Explore More</h4>
            <p>
              Let YESCITY help you discover hidden gems and unique experiences
              across India.
            </p>
            <button className="mt-2 bg-[#003F6E] text-white px-4 py-1 flex items-center justify-center font-bold cursor-pointer rounded-md hover:bg-blue-900 transition">
              Explore Now
            </button>
          </div>
          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>Contact Us</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Refund and Cancellation</li>
              <li>Shipping and Delivery</li>
              <li>Disclaimer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Explore Cities</h4>
            <ul>
              <li>Varanasi</li>
              <li>Agra</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-blue p-4 text-sm">
          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
          
          
            <a
              href="https://www.facebook.com/people/Yes-City/61564192540540/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <FaFacebook />
            </a>
              <a
              href="https://www.instagram.com/yescity.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

              <a
              href="https://www.linkedin.com/company/yes-city-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Copyright */}
          <p>© 2025 YESCITY. All rights reserved.</p>

          {/* Button */}
          <button className="bg-[#003F6E] flex items-center justify-center font-bold cursor-pointer text-white px-4 py-1 rounded-md hover:bg-blue-900 transition">
            Plan Your Trip
          </button>
        </div>
      </footer>
    </>
  );
}
