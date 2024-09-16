import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, Form, redirect } from "@remix-run/react";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import Header from "~/components/common/header";
import { getUserSession } from "~/session.server";
import { deleteDomain, getDomains, updateDomain } from "~/domain.server";

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<any | null> => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/home");
  }

  const domains = await getDomains(userId);
  return domains;
};

export const action = async ({ request }: ActionFunctionArgs): Promise<any> => {
  const formData = await request.formData();
  const doaminId = formData.get("delete") as string;
  console.log("doaminId", doaminId);
  if (doaminId) {
    const deleteDomainEntry = await deleteDomain(doaminId);
    return deleteDomainEntry;
  } else {
    const domain = formData.get("domain") as string;
    const url = formData.get("url") as string;
    console.log("eidt the domain");
    const editPayload = { domainName: domain, domainUrl: url };
    const edit = await updateDomain(editPayload);
    return edit;
  }

  return null;
};
export default function Manage() {
  const loaderData = useLoaderData<any>(); // Always get loader data first
  const domains = loaderData?.data || [];

  // Define hooks outside any conditions or loops
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [domainStates, setDomainStates] = useState(() =>
    domains.map((domain: any) => ({
      domainName: domain.domainName,
      domainUrl: domain.domainUrl,
    })),
  );
  const [alert, setAlert] = useState<{
    code: string;
    msg: string;
    random: number;
  } | null>(null);

  useEffect(() => {
    if (loaderData) {
      const { code, msg } = loaderData;
      setAlert({ code, msg, random: Math.random() });
    }
  }, [loaderData]);

  const handleEditToggle = (index: number) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const handleInputChange = (
    index: number,
    field: "domainName" | "domainUrl",
    value: string,
  ) => {
    const updatedDomains = [...domainStates];
    updatedDomains[index][field] = value;
    setDomainStates(updatedDomains);
  };

  // Render the UI only after hooks are initialized
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-yellow-400">
      <Header />

      <div className="flex flex-col space-x-4 mt-20 gap-4 items-start justify-center">
        <Link className="text-black hover:text-gray-400" to="/home">
          <IoMdArrowBack size={20} />
        </Link>

        <div className="w-full space-y-4">
          {domains.map((domain: any, index: number) => {
            const isEditing = editingIndex === index;

            return (
              <div
                key={domain.id}
                className="w-full flex space-x-4 items-center justify-center gap-2 p-2 rounded-md shadow-sm"
              >
                <Form
                  method="post"
                  className="w-full flex gap-4 items-center justify-center"
                >
                  <input
                    type="text"
                    disabled
                    value={domainStates[index].domainName}
                    placeholder="Domain name..."
                    className="custom-shadow p-4 w-full rounded-md bg-white transition-all duration-300"
                  />
                  <input
                    type="hidden"
                    name="domain"
                    value={domain.domainName}
                  />
                  <input
                    type="url"
                    name="url"
                    value={domainStates[index].domainUrl}
                    disabled={!isEditing}
                    placeholder="Domain URL..."
                    className="custom-shadow p-4 w-full rounded-md bg-white transition-all duration-300"
                    onChange={(e) =>
                      handleInputChange(index, "domainUrl", e.target.value)
                    }
                  />
                  {isEditing ? (
                    <button
                      type="submit"
                      className="w-[250px] custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleEditToggle(index)}
                      className="w-[250px] custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    name="delete"
                    value={domain.id}
                    className="custom-shadow px-6 py-4 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </Form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
