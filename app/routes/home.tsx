import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import NavHeader from "~/components/common/nav_header";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

const Home: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <NavHeader isLogged={isLogged} />

      {/* Main Content */}
      <main className="flex h-80  flex-col items-center justify-center mt-20 space-x-4">
        <Form method="post" className="flex flex-row space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="search domain here..."
            className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400"
          />

          {/* About Us Button */}
          <button
            type="submit"
            className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
          >
            Search
          </button>
        </Form>
      </main>
    </div>
  );
};

export default Home;
