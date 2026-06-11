import { Heart, CheckCircle, Globe } from "lucide-react";

const SupplierCard = ({ supplier }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      {/* Supplier header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          R
        </div>
        <div>
          <p className="text-xs text-gray-400 leading-none mb-0.5">Supplier</p>
          <p className="text-sm font-semibold text-gray-800">{supplier.name}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>🇩🇪</span>
          <span>{supplier.country}</span>
        </div>
        {supplier.verified && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span>Verified Seller</span>
          </div>
        )}
        {supplier.worldwide && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>Worldwide shipping</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-1">
        <button className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
          Send inquiry
        </button>
        <button className="w-full py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-50 text-sm font-medium transition-colors">
          Seller's profile
        </button>
      </div>

      {/* Save */}
      <button className="flex items-center justify-center gap-1.5 text-sm text-blue-500 hover:text-blue-700 transition-colors">
        <Heart className="w-4 h-4" />
        Save for later
      </button>
    </div>
  );
};
export default SupplierCard;
