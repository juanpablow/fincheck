import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const { signedIn, signin, signout, user } = useContext(AuthContext);

  return { signedIn, signin, signout, user };
}
