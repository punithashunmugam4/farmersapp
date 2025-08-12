import { Clock, MapPin, Pencil } from "lucide-react";
import Badge from "@mui/material/Badge";

export function MyBidsCard({ user, product, onBidClick }) {
  const getTimeLeftColor = (timeLeft) => {
    if (timeLeft.includes("h")) return "bg-yellow-100 text-yellow-800";
    else if (timeLeft.includes("m")) return "bg-red-100 text-red-800";
    else if (timeLeft.includes("Rejected")) return "bg-red-100 text-red-800";

    return "bg-green-100 text-green-800";
  };

  const myBid = product.all_bids.filter((bid) => bid.name === user.username)[0];

  const getTimeLeft = (auction_hrs, created_time) => {
    const now = new Date();
    const start_time = new Date(
      created_time.split("T")[0] +
        " " +
        created_time.split("T")[1].split(".")[0]
    );
    // console.log("Start time:", start_time);
    // console.log("Current time:", now);
    const end_time = new Date(
      start_time.setHours(start_time.getHours() + auction_hrs)
    );
    // console.log("End time:", end_time);
    const diff = end_time.getTime() - now.getTime();
    // console.log("Time left calculation:", diff);
    if (diff <= 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d left`;
    }
    if (hours > 0) {
      return `${hours}hrs left`;
    }
    return `${minutes}mins left`;
  };
  var timeleft = getTimeLeft(
    4,
    "2025-08-12T20:11:23.000Z" // product.auction_time_hrs,
    //  product.createdAt
  );

  if (myBid.status) {
    timeleft = myBid.status;
  }

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
          <Badge className={getTimeLeftColor(timeleft)}>
            <Clock className="w-3 h-3 mr-1" />
            {timeleft}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <h3 className="font-semibold first-letter-caps  text-lg text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="first-letter-caps text-gray-900 mb-2">
            {product.product} - {product.weight} kg
          </p>
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
            <p className="text-s text-gray-500">My Bid</p>
            <p className="text-xl font-bold text-farm-green-600">
              Rs.{" "}
              {parseFloat(
                product?.all_bids.filter((bid) => bid.name === user.username)[0]
                  .submit_amount || 0
              ).toFixed(2)}
            </p>
          </div>
          {timeleft !== ("Accepted" || "Awarded") && !myBid.status ? (
            <button
              onClick={() => onBidClick(product, "accept_modal")}
              className="w-full p-2 farm-green-600 hover:farm-green-700 text-white"
            >
              Modify your Bid
            </button>
          ) : (
            <p
              className={`font-bold pt-3 text-xl text-center ${
                myBid.status === "Rejected"
                  ? "text-red-800"
                  : "text-farm-green-600"
              }`}
            >
              {myBid.status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
