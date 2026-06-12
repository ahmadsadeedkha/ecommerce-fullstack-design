import React from "react";
import heroImg from "../assets/images/hero-placeholder.png";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto p-0 lg:p-4">
      <div className="bg-white overflow-hidden">
        <div className="grid grid-cols-12 gap-6 items-stretch">
          <aside className="hidden lg:block col-span-12 lg:col-span-3 p-4">
            <ul className="space-y-2 text-sm">
              <li className="bg-blue-50 text-blue-700 rounded-md px-3 py-2 font-medium">
                Automobiles
              </li>
              <li className="px-3 py-2">Clothes and wear</li>
              <li className="px-3 py-2">Home interiors</li>
              <li className="px-3 py-2">Computer and tech</li>
              <li className="px-3 py-2">Tools, equipments</li>
              <li className="px-3 py-2">Sports and outdoor</li>
              <li className="px-3 py-2">Animal and pets</li>
              <li className="px-3 py-2">Machinery tools</li>
              <li className="px-3 py-2">More category</li>
            </ul>
          </aside>

          <div
            className="col-span-12 lg:col-span-7 p-8 flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="w-full max-w-md bg-white/0 backdrop-blur-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Latest trending
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                Electronic items
              </h3>
              <div className="mt-6">
                <button className="px-4 py-2 bg-white text-gray-800 rounded-md shadow">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block col-span-12 lg:col-span-2 p-4 space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full" />
                <div>
                  <p className="text-sm text-gray-700">Hi, user</p>
                  <p className="text-xs text-gray-500">let's get started</p>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <button className="px-3 py-2 bg-blue-500 text-white rounded-md">
                  Join now
                </button>
                <button className="px-3 py-2 bg-white border rounded-md">
                  Log in
                </button>
              </div>
            </div>

            <div className="bg-orange-400 p-4 rounded-md text-white">
              Get US $10 off with a new supplier
            </div>
            <div className="bg-teal-400 p-4 rounded-md text-white">
              Send quotes with supplier preferences
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
