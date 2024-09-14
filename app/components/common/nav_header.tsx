import { Link } from "@remix-run/react";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

export default function NavHeader({ isLogged }: { isLogged: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

              <button
                className="text-black hover:text-gray-400"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <FiUser size={24} />
              </button>
              <Menu
                className="mt-4"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Add domain</MenuItem>
                <MenuItem onClick={handleClose}>Mange domains</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </header>
    </>
  );
}
