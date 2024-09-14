import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { IoMdArrowBack } from "react-icons/io";
import Header from "~/components/common/header";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function signin() {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <Header />
      <Form
        method="post"
        className="flex flex-col space-x-4 mt-20 gap-4 items-start justify-center"
      >
        <Link className="text-black hover:text-gray-400 ml-4" to="/home">
          <IoMdArrowBack size={20} />
        </Link>
        {/* Search Input */}
        <input
          type="text"
          placeholder="user name..."
          className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
        />
        <input
          type="password"
          placeholder="password..."
          className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
        />
        {/* Login Button */}
        <div className="w-full flex flex-row space-x-4 items-center justify-center gap-4">
          <button
            type="submit"
            className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
          >
            Login
          </button>
          <Link className="text-black hover:text-gray-400 ml-4" to="/signup">
            <p className="font-medium">Signup</p>
          </Link>
        </div>
      </Form>
    </div>
  );
}
