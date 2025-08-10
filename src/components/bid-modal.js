import { useState } from "react";
import { useToast } from "./hooks/use-toast.ts";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export function BidModal({ user, product, isOpen, onClose }) {
  const [bidAmount, setBidAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount || !quantity) return;

    const currentBid = parseFloat(
      product?.currentBid || product?.startingPrice || "0"
    );
    const newBid = parseFloat(bidAmount);

    if (newBid <= currentBid) {
      toast({
        title: "Invalid bid",
        description: `Bid must be higher than current bid of $${currentBid.toFixed(
          2
        )}`,
        variant: "destructive",
      });
      return;
    }
  };

  if (!product) return null;

  let current_bid = product.all_bids.filter((a) => {
    console.log(a.name, user.username);
    if (a.name === user.username) {
      return true;
    }
    return false;
  });

  const minBid = (
    (product?.max_bid?.submit_amount
      ? parseFloat(product.max_bid.submit_amount)
      : parseFloat(product.min_bid)) + 0.05
  ).toFixed(2);
  const estimatedTotal =
    bidAmount && quantity
      ? (parseFloat(bidAmount) * parseInt(quantity)).toFixed(2)
      : "0.00";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogTitle>
          <Dialog>Place Your Bid</Dialog>
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
              <h4 className="font-semibold text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-600">
                {product.quantity} {product.unit} available
              </p>
              <p className="text-sm text-farm-green-600 font-semibold">
                Current bid: Rs.{" "}
                {parseFloat(
                  current_bid[0] && current_bid[0].submit_amount
                    ? current_bid[0].submit_amount
                    : 0
                ).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Minimum bid:</span>
                <p className="font-semibold">Rs. {product.min_bid}</p>
              </div>
              <div>
                <span className="text-gray-500">Available:</span>
                <p className="font-semibold">{product.weight} kg</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bidAmount">Your Bid</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rs.
              </span>
              <input
                id="bidAmount"
                type="number"
                step="0.01"
                min={minBid}
                placeholder={current_bid[0]?.submit_amount || 0.0}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="pl-8"
                required
              />
            </div>
          </div>

          {/* <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.quantity}
              placeholder="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div> */}

          <div className="farm-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estimated Total:</span>
              <span className="font-bold text-farm-green-700">
                ${estimatedTotal}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 farm-green-600 hover:bg-farm-green-700"
              disabled={false}
            ></Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
