import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Alerts, { AlertCode } from "~/components/common/alerts";
import Header from "~/components/common/header";
import { createUserSession } from "~/session.server";
import { getUser } from "~/user.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Process the form submission
  const formData = await request.formData();
  const userName = formData.get("username") as string;
  const password = formData.get("password") as string;

  const getUserPayload = { userName, password };
  const response = await getUser(getUserPayload);
  // console.log("response at signin call", response);

  const { data, code, msg } = response;
  // console.log("data at signin call", data);
  // console.log("code at signin call", code);
  // console.log("msg at signin call", msg);
  // console.log(data.id)
  if (code === "200") {
    // console.log("session is getting created");
    let createUserSessionPayload = {
      request,
      userId: data.id,
      redirectTo: "/home",
    };
    return createUserSession(createUserSessionPayload);
  }
  return response;
};

export default function signin() {
  const actionData: any = useActionData();

  // console.log("actionData at sign in page", actionData);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    code: string;
    msg: string;
    random: number;
  } | null>(null);

  useEffect(() => {
    if (actionData) {
      const { data, code, msg } = actionData;

      // Set the alert state when actionData is received
      setAlert({ code, msg, random: Math.random() });

      if (data) {
        setPassword("");
        setUserName("");
      }
    }
  }, [actionData]);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <Header />

      {/* Conditionally render Alerts */}
      {alert && (
        <Alerts
          code={alert.code as AlertCode}
          msg={alert.msg}
          random={alert.random}
        />
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
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="user name..."
          className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
