import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex items-center px-4 py-2 rounded-full bg-gray-300 shadow-inner w-full max-w-md">
      <FaSearch className="text-white text-lg mr-3" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none text-white placeholder-white w-full"
      />
    </div>
  );
}
