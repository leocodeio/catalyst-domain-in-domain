import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getDomainUrl } from "~/domain.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("params at home page", params);
  const domainResponse = await getDomainUrl(params.domain as string);
  console.log("domainResponse at home page", domainResponse);
  return domainResponse;
};

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();
  console.log("loaderData at home page", loaderData);
  useEffect(() => {
    if (loaderData?.data?.domainUrl) {
      toast.success("Domain found");
      window.open(loaderData?.data?.domainUrl, "_blank");
    } else {
      toast.error("Domain not found");
    }
  }, [loaderData]);
}
