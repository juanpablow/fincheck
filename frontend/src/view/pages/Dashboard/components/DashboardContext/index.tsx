import { localStorageKeys } from "@app/config/localStorageKeys";
import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: "income" | "expense" | null;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openNewTransactionModal(type: "income" | "expense"): void;
  closeNewTransactionModal(): void;
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

    return isValid ? parsedValue : true;
  });
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    "income" | "expense" | null
  >(null);

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

  const openNewTransactionModal = useCallback((type: "income" | "expense") => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewTransactionModalOpen,
        isNewAccountModalOpen,
        newTransactionType,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
