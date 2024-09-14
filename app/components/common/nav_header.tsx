import { Link } from "@remix-run/react";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";

export default function NavHeader({ isLogged }: { isLogged: boolean }) {
  return (
    <>
      <header className="custom-shadow w-full bg-white text-black p-6 flex justify-between items-center shadow-lg rounded-md">
        <Link to="/home">
          <h1 className="text-xl font-bold">DOMAIN IN DOMAIN</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {!isLogged ? (
            <Link to="/signin" className="text-black hover:text-gray-400">
              <FiLogIn size={24} />
            </Link>
          ) : (
            <>
              <Link to="/signin" className="text-black hover:text-gray-400">
                <FiLogOut size={24} />
              </Link>
              <button className="text-black hover:text-gray-400">
                <FiUser size={24} />
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
