import { Form, Link, useNavigate } from "@remix-run/react";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useState } from "react";

export default function NavHeader({ isLogged }: { isLogged: boolean }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleAddDomain = () => {
    navigate("/domain");
    handleCloseMenu();
  };

  const handleProfile = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  const handleManageDomain = () => {
    navigate("/manage");
    handleCloseMenu();
  };

  return (
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
            <Form method="post" className="flex flex-row space-x-4">
              <button type="submit" className="text-black hover:text-gray-400">
                <FiLogOut size={24} />
              </button>
            </Form>

            <button
              className="text-black hover:text-gray-400 relative"
              onClick={handleToggleMenu}
            >
              <FiUser size={24} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-20 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
                <button
                  onClick={handleAddDomain}
                  className="block w-full text-left p-2 hover:bg-gray-200"
                >
                  Add domain
                </button>
                <button
                  onClick={handleManageDomain}
                  className="block w-full text-left p-2 hover:bg-gray-200"
                >
                  Manage domains
                </button>
                <button
                  onClick={handleProfile}
                  className="block w-full text-left p-2 hover:bg-gray-200"
                >
                  Profile
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
