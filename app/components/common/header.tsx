import { Link } from "@remix-run/react";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  return (
    <>
      <header className="custom-shadow w-full bg-white text-black p-6 flex justify-between items-center shadow-lg rounded-md">
        <Link to="/">
          <h1 className="text-xl font-bold">DOMAIN IN DOMAIN</h1>{" "}
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-black hover:text-gray-400">
            <FiLogOut size={24} />
          </button>
          <button className="text-black hover:text-gray-400">
            <FiUser size={24} />
          </button>
        </div>
      </header>
    </>
  );
}
