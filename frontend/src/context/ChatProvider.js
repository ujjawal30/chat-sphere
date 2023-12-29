import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState();
  const [allChats, setAllChats] = useState();

  return (
    <ChatContext.Provider value={{ chat, setChat, allChats, setAllChats }}>
      {children}
    </ChatContext.Provider>
  );
};

// export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
