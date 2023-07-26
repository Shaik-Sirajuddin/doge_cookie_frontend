import { createContext } from "react";
import useAuthApis from "../../Hooks/useAuthApis";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allContexts = useAuthApis();
  return (
    <AuthContext.Provider value={allContexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
