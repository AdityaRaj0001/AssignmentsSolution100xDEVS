import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });
  console.log(res);
}
interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
      lastName,
    },
    select: {
      firstName: true,
      lastName: true,
    },
  });
  console.log(res);
}

async function getUser(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  console.log(user);
}

getUser("admin1");

async function deleteUser(username:string){
    const deletedUser=await prisma.user.delete({
        where:{
            username:username
        }
    })
    console.log("deleted user",deletedUser)
}

// deleteUser("admin1")
// updateUser("admin1", {
//   firstName: "new FirstName",
//   lastName: "new lastName",
// });

// insertUser("admin1", "123456", "harkirat", "singh")
