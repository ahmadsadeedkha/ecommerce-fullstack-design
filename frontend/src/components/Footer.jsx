import React from "react";
import logo from "../assets/icons/logo.svg";
import appStoreLogo from "../assets/icons/AppStore-logo.svg";
import playStoreLogo from "../assets/icons/PlayStore-logo.svg";
import facebookLogo from "../assets/icons/facebook-logo.svg";
import twitterLogo from "../assets/icons/twitter-logo.svg";
import linkedinLogo from "../assets/icons/linkedin-logo.svg";
import instagramLogo from "../assets/icons/instagram-logo.svg";
import youtubeLogo from "../assets/icons/youtube-logo.svg";

const Footer = () => {
  return (
    <footer className=" max-w-7xl mx-auto ">
      <div className="bg-white grid grid-cols-1 md:grid-cols-6 gap-8 p-4">
        <div className="md:col-span-2">
          <div className="flex items-start gap-3">
            <img src={logo} alt="Brand logo" className="w-10 h-10" />
            <div>
              <h3 className="text-blue-600 text-xl font-semibold">Sadeed</h3>
              <p className="text-gray-600 mt-2 text-sm max-w-xs">
                Best information about the company goes here but now lorem ipsum
                is
              </p>

              <div className="flex items-center gap-3 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
                >
                  <img src={facebookLogo} alt="Facebook" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
                >
                    <img src={twitterLogo} alt="Twitter" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
                >
                  <img src={linkedinLogo} alt="LinkedIn" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
                >
                    <img src={instagramLogo} alt="Instagram" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"
                >
                  <img src={youtubeLogo} alt="YouTube" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-5 gap-6">
          <div>
            <h4 className="text-gray-900 font-medium mb-3">About</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find store
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-medium mb-3">Partnership</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Find store
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-medium mb-3">Information</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Money Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-medium mb-3">For users</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  My Orders
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-medium mb-3">Get App</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="inline-flex">
                <img
                  src={appStoreLogo}
                  alt="Download on the App Store"
                  className="h-10 w-auto bg-black rounded-md p-2"
                />
              </a>
              <a href="#" className="inline-flex">
                <img
                  src={playStoreLogo}
                  alt="Get it on Google Play"
                  className="h-10 w-auto bg-black rounded-md p-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-200 flex items-center justify-between border-t border-gray-200 p-4">
        <span className="text-md text-gray-600">© 2026 Sadeed.</span>

        <span className="text-md text-gray-600">English</span>
      </div>
    </footer>
  );
};

export default Footer;
