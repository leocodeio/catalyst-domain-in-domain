import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <>
      <header className="custom-shadow w-full bg-white text-black p-6 flex justify-between items-center shadow-lg rounded-md">
        <Link to="/home">
          <h1 className="text-xl font-bold">DOMAIN IN DOMAIN</h1>
        </Link>
      </header>
    </>
  );
}
