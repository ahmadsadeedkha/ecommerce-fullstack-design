import { useState } from "react";

const ProductGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
        <img
          src={images[selected]}
          alt="Product"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 flex-wrap">
        {images.slice(1).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i + 1)}
            className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${
              selected === i + 1
                ? "border-blue-500"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ProductGallery;
