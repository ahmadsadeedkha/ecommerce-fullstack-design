import React from "react";
import emailIcon from "../assets/icons/email-logo.svg";

const Newsletter = () => {
  return (
    <section className="max-w-7xl mx-auto bg-gray-100">
      <div className="max-w-3xl mx-auto py-8 px-4 text-center">
        <h2 className="text-lg font-semibold">Subscribe on our newsletter</h2>
        <p className="text-gray-600 mt-2 text-sm">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <div className="relative bg-white">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <img src={emailIcon} alt="Email" />
            </span>
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
