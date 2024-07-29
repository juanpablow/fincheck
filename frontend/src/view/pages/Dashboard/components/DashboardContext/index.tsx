import { localStorageKeys } from "@app/config/localStorageKeys";
import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {
    const storedAreValuesVisible = localStorage.getItem(
      localStorageKeys.ARE_VALUES_VISIBLE
    );

    const parsedValue =
      storedAreValuesVisible !== null
        ? JSON.parse(storedAreValuesVisible)
        : null;

    const isValid = typeof parsedValue == "boolean";

    console.log(storedAreValuesVisible);

    return isValid ? parsedValue : true;
  });
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

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
  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
