import React from "react";
import supplierQuoteBg from "../assets/images/supplier-quote-bg.png";

const SupplierQuoteSection = () => {
  return (
    <section className="max-w-7xl mx-auto p-0 lg:p-4">
      <div
        className="relative overflow-hidden lg:rounded-lg "
        style={{
          backgroundImage: `url(${supplierQuoteBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid lg:grid-cols-2 items-center gap-8 px-8 py-14 md:px-14">
          <div className="text-white">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              An easy way to send
              <br />
              requests to all suppliers
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/80 md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <button
              type="button"
              className="lg:hidden mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow transition hover:bg-gray-100"
            >
              Send inquiry
            </button>
          </div>

          <div className="hidden lg:block rounded-xl bg-white p-6 text-gray-900 shadow-lg md:p-8">
            <h3 className="text-lg font-semibold">Send quote to suppliers</h3>

            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="What item you need?"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <textarea
                rows="3"
                placeholder="Type more details"
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="text"
                  placeholder="Quantity"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <select className="min-w-24 rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option>Pcs</option>
                  <option>Boxes</option>
                  <option>Kg</option>
                </select>
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierQuoteSection;
