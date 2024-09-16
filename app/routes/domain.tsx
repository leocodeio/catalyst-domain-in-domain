import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { IoMdArrowBack } from "react-icons/io";
import NavHeader from "../components/common/nav_header";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import Header from "~/components/common/header";
import { getUserSession } from "~/session.server";
import { addDomain } from "~/domain.server";
import { useEffect, useState } from "react";
import Alerts from "~/components/common/alerts";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getUserSession(request);
  // console.log("session data at home page", session.data);
  // console.log(session.data)
  const userId = session.get("userId");
  // console.log("userId at home page", userId);
  if (!userId) {
    return redirect("/home");
  }

  return userId;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Process the form submission
  const formData = await request.formData();
  const domain = formData.get("domain") as string;
  const url = formData.get("url") as string;
  const userId = formData.get("userId") as string;

  const addDomainPayload = {
    userId,
    domainName: domain,
    domainUrl: url,
  };
  const response = await addDomain(addDomainPayload);
  // console.log(response);
  return response;
};

export default function domain() {
  const loaderDataResponse: any = useLoaderData();
  const actionDataResponse: any = useActionData();
  // console.log("actionData at domain page", actionDataResponse);
  // console.log("loaderData at domain page", loaderDataResponse);
  const [domainName, setDomainName] = useState("");
  const [domainUrl, setDomainUrl] = useState("");

  const [alert, setAlert] = useState<{
    code: string;
    msg: string;
    random: number;
  } | null>(null);
  useEffect(() => {
    if (actionDataResponse) {
      const { data, code, msg } = actionDataResponse;

      // Set the alert state when actionData is received
      setAlert({ code, msg, random: Math.random() });

      if (data) {
        // Clear form fields on successful sign-up
        setDomainName("");
        setDomainUrl("");
      }
    }
  }, [actionDataResponse]);
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <Header />
      {alert && (
        <Alerts code={alert.code} msg={alert.msg} random={alert.random} />
      )}
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
          placeholder="domain name..."
          value={domainName}
          name="domain"
          onChange={(e) => setDomainName(e.target.value)}
          className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
        />
        <input
          type="test"
          placeholder="domain url..."
          name="url"
          value={domainUrl}
          onChange={(e) => setDomainUrl(e.target.value)}
          className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
        />
        <input type="hidden" name="userId" value={loaderDataResponse} />
        {/* Login Button */}
        <div className="w-full flex flex-row space-x-4 items-center justify-center gap-4">
          <button
            type="submit"
            className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
          >
            Add
          </button>
        </div>
      </Form>
    </div>
  );
}
