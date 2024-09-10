import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "catalyst-domain-in-domain" },
    { name: "description", content: "Welcome to catalyst!" }
  ];
};

export default function Index() {
  return (
    <div className="h-screen flex items-center justify-center text-center font-sans p-4">
      Welcome - developed by catalyst community -<b>@leocodeio</b>
      <Link to="/home">Home</Link>
    </div>
  );
}
