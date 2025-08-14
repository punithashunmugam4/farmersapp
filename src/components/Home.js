import { StatisticsSection } from "./statistics-section.js";
import { HowItWorksSection } from "./how-it-works-section.js";
import { Footer } from "./footer.js";
import { BidModal } from "./bid-modal.js";
import { FarmerModal } from "./farmer-modal.js";
import { ProductCard } from "./product-card.js";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Navigation from "./navigation.js";
import HeroSection from "./hero-section.js";
import SearchFilters from "./search-filters.js";
import {
  get_all_loads,
  get_my_user_details,
  validateSession_call,
} from "../api_call.js";
require("dotenv").config();
const Home = ({
  isSessionValid,
  setIsSessionValid,
  validateSession,
  user,
  setUser,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // test - change to true for initial loading state
  const [filters, setFilters] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  // test - change to false for initial session invalid state
  // console.log("User: ", user);
  useEffect(() => {
    console.log("Running UseEffect in home.js");
    (async () => {
      let token = sessionStorage.getItem("session_token_farmersapp");
      const validateSession_x = async () => {
        const token = sessionStorage.getItem("session_token_farmersapp");
        let res = await validateSession_call(process.env.BASE_URL, token);
        if (res === false) {
          setUser(null);
          return false;
        }
        if (res.username) {
          return res;
        }
      };
      console.log("Validating session in Home.js");
      let tempSession = await validateSession_x();
      if (tempSession === false) {
        console.log("Session is invalid, redirecting to login page.");
        setIsSessionValid(false);
        setIsLoading(false);
        // navigate("/login");
      } else if (tempSession.username) {
        console.log("Get usedetails in Home.js");
        let user_details = await get_my_user_details(
          process.env.BASE_URL,
          token
        );
        setUser(user_details);
        setIsSessionValid(true);
        setIsLoading(true);
        console.log("Fetching products in Home.js");
        let visibleLoads = await get_all_loads(
          base_url,
          sessionStorage.getItem("session_token_farmersapp")
        );

        if (filters === null) {
          setProducts(visibleLoads);
        } else {
          console.log("Filter:: ", filters);
          setProducts(() => {
            visibleLoads = visibleLoads.filter((product) => {
              if (
                filters.category === "" ||
                product.category.toLowerCase() ===
                  filters.category.toLowerCase()
              ) {
                console.log("Category match: ", product.category);
                return true;
              } else return false;
            });

            visibleLoads = visibleLoads.filter((product) => {
              if (
                filters.location === "" ||
                JSON.stringify(product.product_location)
                  .toLowerCase()
                  .includes(filters.location.toLowerCase())
              ) {
                console.log("Location match: ", product.product_location);
                return true;
              } else return false;
            });
            visibleLoads = visibleLoads.filter((product) => {
              if (
                filters.search === "" ||
                product?.auction_id.toString().includes(filters.search) ||
                product?.product
                  .toLowerCase()
                  .includes(filters.search.toLowerCase()) ||
                product?.name
                  .toLowerCase()
                  .includes(filters.search.toLowerCase()) ||
                JSON.stringify(product.product_location).includes(
                  filters.search
                )
              ) {
                console.log("Search found: ", product);
                return true;
              } else return false;
            });
            return visibleLoads;
          });
        }

        setIsLoading(false);
      }
    })();
  }, [isSessionValid, showFarmerModal, showBidModal, filters]);
  console.log("Fetching products...", products);
  console.log("Fetching user details...", user);
  const handleBidClick = (product) => {
    setSelectedProduct(product);
    setShowBidModal(true);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isSessionValid={isSessionValid}
        setIsSessionValid={setIsSessionValid}
        user={user}
      />
      <HeroSection setShowFarmerModal={setShowFarmerModal} />
      <SearchFilters onFiltersChange={setFilters} />
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
                products.map((product) => {
                  let timeleft = getTimeLeft(
                    4,
                    "2025-08-12T20:11:23.000Z" // product.auction_time_hrs,
                    //  product.createdAt
                  );
                  if (
                    timeleft === "Ended" ||
                    product.status === "Closed" ||
                    product.status === "Accepted"
                  )
                    return;
                  else
                    return (
                      <ProductCard
                        user={user}
                        key={product.auction_id}
                        product={product}
                        timeLeft={timeleft}
                        onBidClick={() => handleBidClick(product)}
                      />
                    );
                })}
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

      {/* <StatisticsSection /> */}
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
