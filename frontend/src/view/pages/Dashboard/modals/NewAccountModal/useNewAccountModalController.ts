import { useDashboard } from "../../components/DashboardContext/useDashboard";

export function useNewAccountModalController() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
