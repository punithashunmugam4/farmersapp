import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Sprout className="text-farm-green-500 w-8 h-8 mr-2" />
              <span className="text-xl font-bold">FarmBid</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting farmers with wholesale buyers through competitive
              bidding.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                target="blank"
                className="text-gray-400 hover:text-farm-green-500 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                target="blank"
                className="text-gray-400 hover:text-farm-green-500 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com/punithashunmugam4/"
                target="blank"
                className="text-gray-400 hover:text-farm-green-500 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Farmers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  How to Sell
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  Pricing Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  Farmer Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Buyers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  How to Buy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  Quality Standards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  Bulk Ordering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="blank"
                  className="hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FarmBid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
