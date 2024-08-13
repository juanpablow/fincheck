import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import toast from "react-hot-toast";
import { LaunchScreen } from "@view/components/LaunchScreen";
import { User } from "@app/entities/User";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [manualSignout, setManualSignout] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const queryClient = useQueryClient();

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    accessToken;

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.ARE_VALUES_VISIBLE);

    setSignedIn(false);
    setManualSignout(true);
    queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  }, [queryClient]);

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError && !manualSignout) {
      toast.error("Sua sessão expirou!");
      signout();
    }
  }, [isError, signout, manualSignout]);

  useEffect(() => {
    if (!signedIn) {
      setManualSignout(false);
    }
  }, [signedIn]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data?.data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
