import { useEffect, useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { add_new_load } from "../api_call";

const update_bid_status = add_new_load;
const sleep = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export function AcceptModal({ user, product, isOpen, onClose }) {
  const inputRef = useRef(null);
  const [isaccepted, setIsAccepted] = useState(false);
  useEffect(() => {
    setIsAccepted(
      product?.all_bids.length > 0
        ? product?.all_bids.some((bid) => {
            if (bid.status === "Accepted") {
              return true;
            }
          })
        : false
    );
  }, [isaccepted, product]);

  if (!product) return null;

  const acceptRejectBid = async (bid_status, bid, e) => {
    e.preventDefault();
    if (bid.status === "Accepted" || isaccepted) {
      toast.error("Bid Already accpted to: ", bid.name);
    } else {
      let updated_all_bids = product.all_bids.map((b) => {
        if (b.name === bid.name) {
          b.status = bid_status;
        }
        if (bid_status === "Accepted" && b.name !== bid.name) {
          b.status = "Rejected";
        }
        return b;
      });
      console.log(updated_all_bids);
      let res = await update_bid_status(
         process.env.REACT_APP_API_URL,
        sessionStorage.getItem("session_token_farmersapp"),
        {
          auction_id: product.auction_id,
          status: bid_status === "Accepted" ? bid_status : "Open",
          all_bids: updated_all_bids,
        }
      );
      if (res.status === 201 || res.status === 200) {
        setIsAccepted(bid_status === "Accepted" ? true : false);
        toast.success(`Bid ${bid_status} successfully!`);
        await sleep(2000);
        onClose();
      } else {
        toast.error("Failed to Accept bid. Please try again later.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onFocus={() => inputRef.current?.focus()}>
      <DialogContent className="max-w-lg">
        <DialogTitle>
          <Dialog>Accept Bid on your product</Dialog>
        </DialogTitle>

        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={
                product.imageUrls?.[0] ||
                "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              }
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold text-gray-900 first-letter-caps ">
                {product.product} - {product.weight} kg
              </h4>
              <p className="text-sm text-farm-green-600 font-semibold">
                Maximum bid: Rs.{" "}
                {parseFloat(product?.max_bid?.submit_amount || 0).toFixed(2)}
              </p>
            </div>
          </div>

          <div className=" grid grid-rows  gap-4  bg-gray-50 rounded-lg p-4 mb-4 ">
            {product.all_bids.length > 0 && product.status !== "Accepted" ? (
              product.all_bids.map((bid) => (
                <div className="grid grid-cols-4 gap-4  text-sm">
                  <div>
                    <span className="text-gray-500">{bid.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      Rs. {bid.submit_amount}
                    </span>
                  </div>
                  <div>
                    <button
                      className="w-full p-1 farm-green-500 hover:farm-green-700 text-white"
                      onClick={(e) => acceptRejectBid("Accepted", bid, e)}
                    >
                      Accept
                    </button>
                  </div>
                  <div>
                    <button
                      className={`w-full p-1 bg-farm-red-500 text-white  ${
                        bid.status === "Rejected"
                          ? "hover:cursor-not-allowed hover:bg-gray-300"
                          : "hover:bg-farm-red-600 hover:text-white"
                      } `}
                      onClick={(e) => acceptRejectBid("Rejected", bid, e)}
                      disabled={bid.status === "Rejected" ? true : false}
                    >
                      {bid.status === "Rejected" ? "Rejected" : "Reject"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Bids made on your product yet</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center pt-4">
          <Button
            type="button"
            variant="outline"
            className="hover:bg-farm-red-500 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
      <ToastContainer position="top-right" autoClose={2000} />
    </Dialog>
  );
}
