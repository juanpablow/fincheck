import { useDashboard } from "../../components/DashboardContext/useDashboard";

export function useNewTransactionModalController() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  };
}
