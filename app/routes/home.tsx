import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Alerts from "~/components/common/alerts";
import NavHeader from "~/components/common/nav_header";
import { getDomainUrl } from "~/domain.server";
import { destroyUserSession, getUserSession } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  console.log("url at home page", url);
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
  const formData = await request.formData();
  const searchToken = formData.get("searchToken") as string;
  const search = formData.get("search") as string;

  if (searchToken) {
    const searchUrl = await getDomainUrl(search);
    // console.log("searchUrl at home page", searchUrl)
    return searchUrl;
  } else {
    const session = await destroyUserSession({ request, redirectTo: "/home" });
    return session;
  }
};

const Home: React.FC = () => {
  const loaderDataResponse: { userId: string | null } = useLoaderData();
  const actoinDataResponse: any = useActionData();

  // console.log("loaderData at home page", loaderDataResponse);
  const userId = loaderDataResponse.userId;
  const [search, setSearch] = useState("");

  const [alert, setAlert] = useState<{
    code: string;
    msg: string;
    random: number;
  } | null>(null);

  useEffect(() => {
    if (actoinDataResponse) {
      const { data, code, msg } = actoinDataResponse;
      // Set the alert state when actionData is received
      setAlert({ code, msg, random: Math.random() });

      if (data) {
        setSearch("");
      }
      if (code === "200") {
        window.open(data.domainUrl, "_blank");
      }
    }
  }, [actoinDataResponse]);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <NavHeader isLogged={userId === null ? false : true} />

      {/* Conditionally render Alerts */}
      {alert && (
        <Alerts
          code={alert.code as "200" | "400"}
          msg={alert.msg || "Domain not found"} 
          random={alert.random || Math.random()}
        />
      )}

      {/* Main Content */}
      <main className="flex h-80  flex-col items-center justify-center mt-20 space-x-4">
        <Form method="post" className="flex flex-row space-x-4">
          {/* Search Input */}
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search domain here..."
            className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400"
          />
          <input type="hidden" name="searchToken" value="searchToken" />

          {/* About Us Button */}
          <button
            type="submit"
            className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
          >
            Search
          </button>
        </Form>
      </main>
      <Outlet />
    </div>
  );
};

export default Home;
