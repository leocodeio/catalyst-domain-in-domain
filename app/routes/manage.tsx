import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { IoMdArrowBack } from "react-icons/io";
import NavHeader from "~/components/common/nav_header";

// Simulated loader function - Replace with actual data fetching logic
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Example of domains returned by the loader
  const domains = [
    { domainName: "example.com", url: "https://example.com" },
    { domainName: "mywebsite.com", url: "https://mywebsite.com" },
  ];
  return domains;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Here you would process the form submission
  const formData = await request.formData();
  const domain = formData.get("domain");
  const url = formData.get("url");

  // Logic to add the new domain to the user's data would go here

  return null;
};

export default function Manage() {
  const loaderData = useLoaderData<{ domainName: string; url: string }[]>();

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <NavHeader isLogged={true} />

      <div className="flex flex-col space-x-4 mt-20 gap-4 items-start justify-center">
        {/* Back Button */}
        <Link className="text-black hover:text-gray-400" to="/home">
          <IoMdArrowBack size={20} />
        </Link>

        {/* List of existing domains */}
        <div className="w-full space-y-4">
          {loaderData.map((domain, index) => (
            <div
              key={index}
              className="w-full flex space-x-4 items-center justify-center gap-4 p-4 rounded-md shadow-sm"
            >
              {/* Add New Domain Form */}
              <Form
                method="post"
                className="w-full flex space-y-4 mt-8 gap-4 items-center justify-center"
              >
                <input
                  type="text"
                  name="domain"
                  value={domain.domainName}
                  disabled
                  placeholder="Domain name..."
                  className="custom-shadow p-4 w-full rounded-md bg-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="url"
                  value={domain.url}
                  disabled
                  placeholder="Domain URL..."
                  className="custom-shadow p-4 w-full rounded-md bg-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                >
                  Delete
                </button>
              </Form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
