import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { id } = args;
      const userProfile = await prisma.user({ id });
      const postsProfile = await prisma.user({ id }).posts;
      return { userProfile, postsProfile };
    }
  }
};
