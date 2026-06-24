import { useState } from "react";
import { Check } from "lucide-react";

const TABS = ["Description", "Reviews", "Shipping", "About seller"];

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-gray-200 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Description" && (
        <div className="flex flex-col gap-4">
          {/* Description text */}
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>

          {/* Specs table */}
          {product.specs && product.specs.length > 0 && (
            <table className="w-full text-sm border-collapse">
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.label} className="border border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 text-gray-500 font-medium w-32">
                      {spec.label}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="flex flex-col gap-2 mt-1">
              {product.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "Reviews" && (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}
      {activeTab === "Shipping" && (
        <p className="text-sm text-gray-500">Worldwide shipping available.</p>
      )}
      {activeTab === "About seller" && (
        <p className="text-sm text-gray-500">Seller information goes here.</p>
      )}
    </div>
  );
};
export default ProductTabs;
