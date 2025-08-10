import { Store, ShoppingCart, CheckCircle, Shield, Truck } from "lucide-react";

export default function HeroSection({ setShowFarmerModal }) {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Connect Farmers with{" "}
              <span className="text-farm-green-600">Wholesale Buyers</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              The premier marketplace where farmers showcase fresh produce and
              wholesale buyers secure the best deals through our competitive
              bidding system.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="farm-green-600 hover:bg-farm-green-700 text-white px-8 py-3 text-base rounded shadow-lg flex items-center justify-center hover:text-farm-green-600 hover:bg-green-50 transition-colors duration-200"
                onClick={() => setShowFarmerModal(true)}
              >
                <Store className="w-5 h-5 mr-2" />
                Start Selling
              </button>
              <button
                variant="outline"
                className="border-farm-green-600 text-farm-green-600 hover:bg-green-500 px-8 py-3 text-base rounded shadow-lg flex items-center justify-center transition-colors duration-200 hover:text-white hover:border-transparent"
                onClick={() => {
                  window.scrollTo({
                    top: document.getElementById("products").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Browse Products
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="text-farm-green-600 w-5 h-5 mr-2" />
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-farm-green-600 w-5 h-5 mr-2" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center">
                <Truck className="text-farm-green-600 w-5 h-5 mr-2" />
                <span>Direct from Farm</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Farmers market with fresh vegetables"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
