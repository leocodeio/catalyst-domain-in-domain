import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Alerts, { AlertCode } from "~/components/common/alerts";
import Header from "~/components/common/header";
import NavHeader from "~/components/common/nav_header";
import { getUserSession } from "~/session.server";
import { getUserById, updateUser } from "~/user.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getUserSession(request);
  // console.log("session data at home page", session.data);
  // console.log(session.data)
  const userId = session.get("userId");
  // console.log("userId at home page", userId);
  if (!userId) {
    return redirect("/home");
  }

  const user = await getUserById(userId as string);
  // console.log("user at profile page", user);
  return user.data;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Process the form submission
  const formData = await request.formData();
  const userName = formData.get("userName") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const UserPayload = { userName, password, confirmPassword };
  const response = await updateUser(UserPayload);
  // console.log(password, confirmPassword);
  return response;
};

export default function profile() {
  const loaderDataResponse: any = useLoaderData();
  const actionDataResponse: any = useActionData();
  // console.log("actionData at profile page", actionDataResponse);
  useEffect(() => {
    if (actionDataResponse) {
      const { data, code, msg } = actionDataResponse;

      // Set the alert state when actionData is received
      setAlert({ code, msg, random: Math.random() });

      if (data) {
        setPassword("");
        setConfirmPassword("");
      }
    }
  }, [actionDataResponse]);

  const userName = loaderDataResponse.userName;
  // console.log("loaderData at profile page", loaderDataResponse);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState<{
    code: string;
    msg: string;
    random: number;
  } | null>(null);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      {/* Header */}
      <Header />
      <div className="flex flex-col mt-2 gap-4 items-start justify-center">
        <h2 className="text-black font-bold text-2xl">Hi!!!! {userName}</h2>
      </div>
      {/* Conditionally render Alerts */}
      {alert && (
        <Alerts
          code={alert.code as AlertCode}
          msg={alert.msg}
          random={alert.random}
        />
      )}

      {/* Main Content */}
      <main className="flex h-80  flex-col items-center justify-center mt-20 space-x-4">
        <Form method="post" className="flex flex-col items-start space-y-4">
          {/* Back Button */}
          <Link className="text-black hover:text-gray-400" to="/home">
            <IoMdArrowBack size={20} />
          </Link>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password..."
            className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password..."
            className="custom-shadow p-4 w-96 rounded-md bg-white text-left placeholder-gray-400 m-0"
          />
          <input type="hidden" name="userName" value={userName} />
          {/* About Us Button */}
          <div className="w-full flex flex-row space-x-4 items-center justify-center gap-4">
            <button
              type="submit"
              className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </Form>
      </main>
    </div>
  );
}
