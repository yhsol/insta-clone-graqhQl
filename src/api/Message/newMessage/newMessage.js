import { subscribe } from "graphql";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
      }
    }
  }
};
