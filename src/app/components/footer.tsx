import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-4">
        
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
