import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    sayHello: async () => {
      console.log(await prisma.users());
      return "it's for say hello!";
    }
  }
};
