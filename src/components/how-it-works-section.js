import { Sprout, Gavel, Handshake } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How FarmBid Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to connect farmers with wholesale buyers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 farm-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              1. Farmers List Products
            </h3>
            <p className="text-gray-600">
              Farmers upload fresh produce with photos, descriptions, and
              starting prices for competitive bidding.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 farm-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gavel className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2. Buyers Place Bids
            </h3>
            <p className="text-gray-600">
              Wholesale buyers browse products and place competitive bids based
              on quality, quantity, and price.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 farm-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3. Secure Transactions
            </h3>
            <p className="text-gray-600">
              When auctions end, highest bidders win and secure payment
              processing ensures smooth transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
