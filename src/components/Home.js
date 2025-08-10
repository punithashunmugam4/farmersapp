import { StatisticsSection } from "./statistics-section.js";
import { HowItWorksSection } from "./how-it-works-section.js";
import { Footer } from "./footer.js";
import { BidModal } from "./bid-modal.js";
import { FarmerModal } from "./farmer-modal.js";
import { ProductCard } from "./product-card.js";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import HeroSection from "./hero-section.js";
import SearchFilters from "./search-filters.js";
import { validateSession_call, get_all_loads } from "../api_call.js";
import { useNavigate } from "react-router-dom";
const base_url = "http://localhost:3500/api/";

const Home = ({ isSessionValid, setIsSessionValid, validateSession, user }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // test - change to true for initial loading state
  const [filters, setFilters] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  // test - change to false for initial session invalid state
  console.log("User: ", user);
  useEffect(() => {
    console.log("Running UseEffect in home.js");
    (async () => {
      let tempSession = await validateSession();
      if (tempSession) {
        setIsSessionValid(true);
        setIsLoading(true);
        let visibleLoads = await get_all_loads(
          base_url,
          sessionStorage.getItem("session_token_farmersapp")
        );
        setProducts(visibleLoads);

        setIsLoading(false);
      } else {
        console.log("Session is invalid, redirecting to login page.");
        setIsSessionValid(false);
        setIsLoading(false);
        navigate("/login");
      }
    })();
  }, []);
  console.log("Fetching products...", products);
  const handleBidClick = (product) => {
    setSelectedProduct(product);
    setShowBidModal(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getBidCount = (productId) => {
    // Mock bid count for display
    return Math.floor(Math.random() * 20) + 5;
  };

  const getTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d left`;
    }
    if (hours > 0) {
      return `${hours}h left`;
    }
    return `${minutes}m left`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isSessionValid={isSessionValid}
        setIsSessionValid={setIsSessionValid}
      />
      <HeroSection setShowFarmerModal={setShowFarmerModal} />
      <SearchFilters onFiltersChange={handleFiltersChange} />
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Products
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {products.length} products found
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard
                    user={user}
                    key={product.auction_id}
                    product={product}
                    bidCount={getBidCount(product.auction_id)}
                    timeLeft={getTimeLeft(product.auction_time_hrs.toString())}
                    onBidClick={() => handleBidClick(product)}
                  />
                ))}
            </div>
          )}

          {products.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Login to view products and place bids.
              </p>
            </div>
          )}
        </div>
      </section>

      <StatisticsSection />
      <HowItWorksSection />
      <Footer />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50  rounded-full ">
        <button
          onClick={() => setShowFarmerModal(true)}
          className="earth-500 hover:bg-earth-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-xl"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      <BidModal
        user={user}
        product={selectedProduct}
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
      />
      <FarmerModal
        user={user}
        isOpen={showFarmerModal}
        onClose={() => setShowFarmerModal(false)}
      />
    </div>
  );
};

export default Home;
