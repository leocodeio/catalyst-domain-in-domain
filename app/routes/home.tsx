import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import NavHeader from "~/components/common/nav_header";
import { destroyUserSession, getUserSession } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getUserSession(request);
  // console.log("session data at home page", session.data);
  // console.log(session.data)

  let response: {
    userId: string | null;
  } = { userId: null };
  const userId = session.get("userId");
  // console.log("userId at home page", userId);
  if (userId) {
    response = { userId: userId };
  }
  return response;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await destroyUserSession({ request, redirectTo: "/home" });
  return session;
};

const Home: React.FC = () => {
  const loaderDataResponse: { userId: string | null } = useLoaderData();
  // console.log("loaderData at home page", loaderDataResponse);
  const userId = loaderDataResponse.userId;
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <NavHeader isLogged={userId === null ? false : true} />

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
