import React from "react";

const DealShowcase = ({ title, subtitle, timer = [], items = [] }) => {
  return (
    <section className="border border-gray-200 rounded-md overflow-hidden bg-white">
      <div className="flex flex-col lg:grid lg:grid-cols-6">
        {/* ── Left panel ── */}
        <div className="lg:col-span-1 lg:border-r border-gray-200 p-4 lg:p-6 bg-white">
          {/* Mobile: title + timer side by side */}
          <div className="flex items-start justify-between lg:block">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-black leading-tight">
                {title}
              </h3>
              <p className="text-gray-500 mt-1 text-xs lg:text-sm">
                {subtitle}
              </p>
            </div>

            {/* Mobile timer – Hour/Min/Sec only, horizontal */}
            <div className="flex gap-2 lg:hidden">
              {timer
                .filter((b) => b.label !== "Days")
                .map((block) => (
                  <div
                    key={block.label}
                    className="w-12 h-12 bg-gray-100 text-gray-800 rounded-md flex flex-col items-center justify-center"
                  >
                    <span className="text-sm font-semibold leading-none">
                      {block.value}
                    </span>
                    <span className="text-[10px] leading-none mt-1">
                      {block.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Desktop timer – all 4 blocks stacked/wrapped */}
          <div className="hidden lg:flex mt-6 gap-2 flex-wrap">
            {timer.map((block) => (
              <div
                key={block.label}
                className="w-12 h-12 bg-gray-700 text-white rounded-md flex flex-col items-center justify-center"
              >
                <span className="text-sm font-semibold leading-none">
                  {block.value}
                </span>
                <span className="text-[10px] leading-none mt-1">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Items ── */}
        {/* Mobile: horizontal scroll; Desktop: 5-column grid */}
        <div className="lg:col-span-5 flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-5 divide-x divide-gray-200">
          {items.map((item) => (
            <div
              key={item.name}
              className="shrink-0 w-36 lg:w-auto p-4 flex flex-col items-center justify-between text-center border-t lg:border-t-0 min-h-[210px]"
            >
              <div className="w-full flex items-center justify-center flex-1">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-contain"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-gray-100" />
                )}
              </div>

              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h4>
                {item.discount && (
                  <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                    {item.discount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealShowcase;
