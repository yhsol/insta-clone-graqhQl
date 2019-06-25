import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exist = await prisma.$exists.user({ username });
      if (exist) {
        throw Error("This user name is already exists!");
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
