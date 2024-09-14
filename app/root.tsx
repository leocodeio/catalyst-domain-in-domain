import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";

// Combine links into a single export
export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/CatalystFavicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Open+Dyslexic&display=swap'",
    },
    { rel: "icon", href: "/CatalystFavicon.png", type: "image/png" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-open-dyslexic">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
