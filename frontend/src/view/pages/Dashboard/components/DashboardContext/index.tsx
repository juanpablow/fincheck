import { localStorageKeys } from "@app/config/localStorageKeys";
import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {
    const storeAreValuesVisible: boolean = JSON.parse(
      localStorage.getItem(localStorageKeys.ARE_VALUES_VISIBLE) as string
    );

    return storeAreValuesVisible;
  });

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => {
      const newState = !prevState;
      localStorage.setItem(
        localStorageKeys.ARE_VALUES_VISIBLE,
        JSON.stringify(newState)
      );
      return newState;
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValueVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
