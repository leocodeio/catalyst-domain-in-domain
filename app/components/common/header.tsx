import { Link } from "@remix-run/react";
import { FiHome } from "react-icons/fi";

export default function Header() {
  return (
    <>
      <header className="custom-shadow w-full bg-white text-black p-6 flex justify-between items-center shadow-lg rounded-md">
        <Link to="/home">
          <h1 className="text-xl font-bold">DOMAIN IN DOMAIN</h1>
        </Link>
        <Link to="/home" className="text-black hover:text-gray-400">
          <FiHome size={24} />
        </Link>
      </header>
    </>
  );
}
