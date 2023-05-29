import { useContext } from "react";
import { IUserContext, UserContext } from "./UserContext";

/* Hook for easy access */
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);

  return context;
}