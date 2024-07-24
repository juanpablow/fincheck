import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    transactions: [1],
    isInitialLoading: false,
    isLoading: false,
  };
}
