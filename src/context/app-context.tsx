import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

interface AppContextType {
  isEnter: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  user: any;
  updateUser: (user: any) => void;
  settings: any
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.log("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);

  const [settings, setSettings] = useState(null)
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!settings)
      getSettings()

    if (!user)
      getUser()
  })

  const getSettings = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => setSettings(res.data.body))
      .catch((err) => console.error(err.message));
  }

  const getUser = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => updateUser(res.data.body))
      .catch((err) => console.error(err.message));
  }

  const updateUser = (user: any) => {
    setUser(user);
  };

  // handle mouse enter
  const handleMouseEnter = () => {
    setIsEnter(true);
  };
  // handle leave
  const handleMouseLeave = () => {
    setIsEnter(false);
  };

  const values = {
    isEnter,
    handleMouseEnter,
    handleMouseLeave,
    user,
    settings,
    updateUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
