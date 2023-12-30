import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    console.log("user :>> ", user);

    // if (!userInfo) {
    //   navigate("/");
    // } else {
    //   navigate("/chats");
    // }
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// export const ChatState = () => useContext(UserContext);

export default UserProvider;
