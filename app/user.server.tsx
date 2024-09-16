import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(createUserPayload: {
  userName: string;
  password: string;
  confirmPassword: string;
}): Promise<any> {
  const { userName, password, confirmPassword } = createUserPayload;
  // console.log("createUserPayload", createUserPayload);
  if (password !== confirmPassword) {
    const output = { data: null, msg: "password mismatch", code: "400" };
    return JSON.parse(JSON.stringify(output));
  }
  const exists = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });
  if (exists) {
    const output = { data: null, msg: "user already exists", code: "400" };
    return JSON.parse(JSON.stringify(output));
  }

  const user = await prisma.user.create({
    data: {
      userName,
      password,
    },
  });
  // console.log("response at createUser call", response);
  const response = {
    data: user,
    msg: "user created successfully!! please Login",
    code: "200",
  };
  return JSON.parse(JSON.stringify(response));
}

export async function getUser(getUserPaylod: {
  userName: string;
  password: string;
}) {
  const { userName, password } = getUserPaylod;
  const user = await prisma.user.findUnique({
    where: {
      userName,
    },
  });
  if (user) {
    if (user.password === password) {
      const response = {
        data: user,
        msg: `welcome back!! ${user.userName}`,
        code: "200",
      };
      return JSON.parse(JSON.stringify(response));
    } else {
      const response = {
        data: null,
        msg: "wrong password",
        code: "400",
      };
      return JSON.parse(JSON.stringify(response));
    }
  } else {
    const response = {
      data: null,
      msg: "user not found",
      code: "400",
    };
    return JSON.parse(JSON.stringify(response));
  }
}

export async function getUserById(userId: string | undefined) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user) {
    const response = {
      data: user,
      msg: `user found!!`,
      code: "200",
    };
    return JSON.parse(JSON.stringify(response));
  } else {
    const response = {
      data: null,
      msg: "user not found",
      code: "400",
    };
    return JSON.parse(JSON.stringify(response));
  }
}

export async function updateUser(updateUserPayload: {
  userName: string;
  password: string;
  confirmPassword: string;
}): Promise<any> {
  const { userName, password, confirmPassword } = updateUserPayload;
  // console.log("updateUserPayload", updateUserPayload);
  if (password !== confirmPassword) {
    const output = { data: null, msg: "password mismatch", code: "400" };
    return JSON.parse(JSON.stringify(output));
  }
  const user = await prisma.user.update({
    where: {
      userName,
    },
    data: {
      password,
    },
  });
  // console.log("response at createUser call", response);
  const response = {
    data: user,
    msg: "user updated successfully!!",
    code: "200",
  };
  return JSON.parse(JSON.stringify(response));
}

export async function deleteUser(userName: string): Promise<any> {
  const user = await prisma.user.delete({
    where: {
      userName,
    },
  });

  if (!user) {
    const response = {
      data: null,
      msg: "user not found",
      code: "400",
    };
    return JSON.parse(JSON.stringify(response));
  }

  const response = {
    data: user,
    msg: "user created successfully!! please Login",
    code: "200",
  };
  return JSON.parse(JSON.stringify(response));
}