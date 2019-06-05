import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullname: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    itsMe: (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
