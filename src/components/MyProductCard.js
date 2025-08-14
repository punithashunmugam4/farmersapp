import { Clock, MapPin, Pencil } from "lucide-react";
import Badge from "@mui/material/Badge";

export function MyProductCard({ user, product, timeLeft, onBidClick }) {
  const getTimeLeftColor = (timeLeft) => {
    if (timeLeft.includes("m")) return "bg-red-100 text-red-800";
    if (timeLeft.includes("h")) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const winner = product.all_bids.filter((bid) => {
    if (bid.status === "Accepted" || bid.status === "Awarded") return true;
    else return false;
  });
  console.log("Winner: ", winner);
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

      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <h3 className="font-semibold first-letter-caps  text-lg text-gray-900 mb-2">
            {product.product} - {product.weight} kg
          </h3>
          <button
            className={`w-10 h-10 shadow-xl rounded-full flex items-center justify-center text-xl
    ${
      product.status.toLowerCase() !== "open"
        ? "hover:cursor-not-allowed hover:bg-gray-300"
        : "hover:bg-green-600 hover:text-black"
    }`}
            disabled={product.status.toLowerCase() !== "open"}
            onClick={() => onBidClick(product, "load_update_modal")}
          >
            <Pencil className="w-6 h-6 mr-1" />
          </button>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {product.product_location[0]?.address}, ,
            {product.product_location[0]?.city},{" "}
            {product.product_location[0]?.state},{" "}
            {product.product_location[0]?.country}, ,
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
              <p className="text-xs text-gray-500">Maximum Bid made</p>
              <p className="text-xl font-bold text-farm-green-600">
                Rs.{" "}
                {parseFloat(product?.max_bid?.submit_amount || 0).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Bids</p>
              <p className="text-lg font-semibold text-gray-900">
                {product.all_bids.length}
              </p>
            </div>
          </div>
          {timeLeft !== ("Accepted" || "Awarded") ? (
            <button
              onClick={() => onBidClick(product, "accept_modal")}
              className="w-full p-2  farm-green-600 hover:farm-green-700 text-white"
            >
              Accept Bid on your product
            </button>
          ) : (
            <p className="text-farm-green-600">
              Winner is <span className="font-bold">{winner[0].name}</span> with
              bid amount{" "}
              <span className="font-bold ">Rs. {winner[0].submit_amount}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
