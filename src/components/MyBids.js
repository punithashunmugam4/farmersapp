import Navigation from "./navigation";
import { BidModal } from "./bid-modal.js";
import { MyBidsCard } from "./MyBidsCard.js";
import { Footer } from "./footer.js";
import SearchFilters from "./search-filters.js";
import { useState, useEffect } from "react";

import {
  get_my_user_details,
  get_my_bids,
  validateSession_call,
} from "../api_call";

const base_url = "http://localhost:3500/api/";

const MyBids = ({
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

  useEffect(() => {
    console.log("Running UseEffect in home.js");
    (async () => {
      let token = sessionStorage.getItem("session_token_farmersapp");
      const validateSession_x = async () => {
        const token = sessionStorage.getItem("session_token_farmersapp");
        let res = await validateSession_call(base_url, token);
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
        let user_details = await get_my_user_details(base_url, token);
        setUser(user_details);
        setIsSessionValid(true);
        setIsLoading(true);
        console.log("Fetching products in Home.js");
        let myLoads = await get_my_bids(
          base_url,
          sessionStorage.getItem("session_token_farmersapp")
        );

        if (filters === null) {
          setProducts(myLoads);
        } else {
          console.log("Filter:: ", filters);
          setProducts(() => {
            myLoads = myLoads.filter((product) => {
              if (
                filters.category === "" ||
                product.category.toLowerCase() ===
                  filters.category.toLowerCase()
              ) {
                console.log("Category match: ", product.category);
                return true;
              } else return false;
            });

            myLoads = myLoads.filter((product) => {
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
            myLoads = myLoads.filter((product) => {
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
            return myLoads;
          });
        }

        setIsLoading(false);
      }
    })();
  }, [isSessionValid, showBidModal, filters]);

  const handleBidClick = (product, modal) => {
    setSelectedProduct(product);
    if (modal === "accept_modal") setShowBidModal(true);
  };

  return (
    <div id="my-products">
      <Navigation
        isSessionValid={isSessionValid}
        setIsSessionValid={setIsSessionValid}
        user={user}
      />
      <SearchFilters onFiltersChange={setFilters} />
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {products.length} bids placed
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
                  return (
                    <MyBidsCard
                      user={user}
                      key={product.auction_id}
                      product={product}
                      onBidClick={handleBidClick}
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
      <Footer />

      {/* Modals */}
      <BidModal
        user={user}
        product={selectedProduct}
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
      />
    </div>
  );
};

export default MyBids;
