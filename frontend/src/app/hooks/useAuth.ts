import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const { signedIn, signin, signout } = useContext(AuthContext);

  return { signedIn, signin, signout };
}
