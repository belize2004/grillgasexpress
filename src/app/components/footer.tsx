import { FaFacebookF, FaTwitter, FaInstagram, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-6 text-sm text-gray-600 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-6">
        
        {/* Address Information */}
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex-initial mb-4 md:mb-0">
            <h3 className="font-semibold text-gray-700 mb-2">Service:</h3>
            <p>4048 Creighton Rd</p>
            <p>Pensacola, FL 32504</p>
            <p className="flex items-center gap-1 mt-1">
              <FaPhone size={14} className="inline" />
              <span>850-619-1918</span>
            </p>
          </div>
          <div className="flex-initial">
            <h3 className="font-semibold text-gray-700 mb-2">Billing:</h3>
            <p>1720 E. Cervantes St.</p>
            <p>Pensacola, FL 32501</p>
          </div>
        </div>
        
        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:text-gray-800">Home</a>
          <a href="#" className="hover:text-gray-800">Products</a>
          <a href="#" className="hover:text-gray-800">Offers</a>
          <a href="#" className="hover:text-gray-800">Contact</a>
          <a href="#" className="hover:text-gray-800">Terms of Service</a>
          <a href="#" className="hover:text-gray-800">Privacy Policy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-800">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="hover:text-gray-800">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="hover:text-gray-800">
            <FaInstagram size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          © 2025 Gas Grill Express. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
