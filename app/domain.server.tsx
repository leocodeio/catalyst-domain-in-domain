import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addDomain(addDomainPayload: {
  userId: string;
  domainName: string;
  domainUrl: string;
}): Promise<any> {
  const { userId, domainName, domainUrl } = addDomainPayload;
  const exists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (exists) {
    const addDomain = await prisma.userDomainPair.create({
      data: {
        userId,
        domainUrl,
        domainName,
      },
    });
    const response = {
      data: addDomain,
      msg: "Domain added successfully!!",
      code: "200",
    };
    return JSON.parse(JSON.stringify(response));
  } else {
    const output = { data: null, msg: "user not found", code: "400" };
    return JSON.parse(JSON.stringify(output));
  }
}

export async function deleteDomain(domainId: string): Promise<any> {
  const domain = await prisma.userDomainPair.delete({
    where: {
      id: domainId,
    },
  });
  if (!domain) {
    const response = {
      data: null,
      msg: "domain not found",
      code: "400",
    };
    return JSON.parse(JSON.stringify(response));
  }
  const response = {
    data: domain,
    msg: "domain deleted successfully!!",
    code: "200",
  };
  return JSON.parse(JSON.stringify(response));
}

export async function isDomainAvailable(domainName: string): Promise<any> {
  const domain = await prisma.userDomainPair.findUnique({
    where: {
      domainName,
    },
  });
  if (domain) {
    const response = {
      data: null,
      msg: "domain already exists",
      code: "400",
    };
    return JSON.parse(JSON.stringify(response));
  } else {
    const response = {
      data: null,
      msg: "domain available",
      code: "200",
    };
    return JSON.parse(JSON.stringify(response));
  }
}

export async function updateDomain(updateDomainPayload: {
  domainName: string;
  domainUrl: string;
}): Promise<any> {
  const { domainName, domainUrl } = updateDomainPayload;
  // console.log("updateUserPayload", updateDomainPayload);
  const domain = await prisma.userDomainPair.update({
    where: {
      domainName,
    },
    data: {
      domainUrl,
    },
  });
  const response = {
    data: domain,
    msg: "domain updated successfully!!",
    code: "200",
  };
  return JSON.parse(JSON.stringify(response));
}

export async function getDomains(userId: string | undefined): Promise<any> {
  const domains = await prisma.userDomainPair.findMany({
    where: {
      userId,
    },
  });
  const response = {
    data: domains,
    msg: "domains fetched successfully!!",
    code: "200",
  };
  return JSON.parse(JSON.stringify(response));
}

export async function getDomainUrl(domainName: string): Promise<any> {
  const domain = await prisma.userDomainPair.findUnique({
    where: {
      domainName,
    },
  });
  if (domain) {
    const response = {
      data: domain,
      msg: "domain fetched successfully!!",
      code: "200",
    };
    return JSON.parse(JSON.stringify(response));
  } else {
    const response = {
      data: null,
      msg: "domain not found",
      code: "400",
    };
    return JSON.parse(JSON.stringify(response));
  }
}
