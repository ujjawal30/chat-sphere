export const getSender = (chatUsers, loggedUser) => {
  return chatUsers[0]._id === loggedUser._id ? chatUsers[1] : chatUsers[0];
};
