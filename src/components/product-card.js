import { Clock, MapPin } from "lucide-react";
import Badge from "@mui/material/Badge";

export function ProductCard({ user, product, timeLeft, onBidClick }) {
  const getTimeLeftColor = (timeLeft) => {
    if (timeLeft.includes("m")) return "bg-red-100 text-red-800";
    if (timeLeft.includes("h")) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  let current_bid = Array.isArray(product?.all_bids)
    ? product.all_bids.filter((a) => {
        if (user && a.name === user.username) {
          return true;
        }
        return false;
      })
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={
            product.imageUrls?.[0] ||
            "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
          }
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isOrganic && (
          <div className="absolute top-3 left-3">
            <Badge className="farm-green-100 text-farm-green-800">
              Organic
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={getTimeLeftColor(timeLeft)}>
            <Clock className="w-3 h-3 mr-1" />
            {timeLeft}
          </Badge>
        </div>
      </div>

      <div className="p-5 ">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <h3 className="font-semibold first-letter-caps  text-lg text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.product} - {product.weight} kg
          </p>
        </div>
        <div className="h-14 text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {product.product_location[0]?.address},{" "}
            {product.product_location[0]?.city},{" "}
            {product.product_location[0]?.state},{" "}
            {product.product_location[0]?.country},{" "}
            {product.product_location[0]?.zip}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Pick up range:</span>
          <div>
            <p className="flex items-center">
              {product.pick_up_range_start_date.split(".")[0]}
            </p>
            <p>{product.pick_up_range_end_date.split(".")[0]}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">Current Bid</p>
              <p className="text-xl font-bold text-farm-green-600">
                Rs.{" "}
                {parseFloat(
                  current_bid[0] && current_bid[0].submit_amount
                    ? current_bid[0].submit_amount
                    : 0
                ).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Bids</p>
              <p className="text-lg font-semibold text-gray-900">
                {Array.isArray(product?.all_bids)
                  ? product?.all_bids.length
                  : 0}
              </p>
            </div>
          </div>
          {(current_bid[0] && current_bid[0]?.status === "Accepted") ||
          current_bid[0]?.status === "Rejected" ? (
            <p
              className={`font-bold pt-3 text-xl text-center ${
                current_bid[0].status === "Rejected"
                  ? "text-red-800"
                  : "text-farm-green-600"
              }`}
            >
              {current_bid[0].status}
            </p>
          ) : (
            <button
              onClick={onBidClick}
              className="w-full p-2 farm-green-600 hover:farm-green-700 text-white"
            >
              Place Bid
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
