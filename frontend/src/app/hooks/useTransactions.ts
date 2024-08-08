import { transactionsService } from "@app/services/transactionsService";
import { useQuery } from "@tanstack/react-query";

export function useTransactions() {
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionsService.getAll({
        month: 7,
        year: 2024,
      }),
  });

  const isInitialLoading = isPending && isFetching;

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
  };
}
