import { transactionsService } from "@app/services/transactionsService";
import { TransactionsFilters } from "@app/services/transactionsService/getAll";
import { useQuery } from "@tanstack/react-query";

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isPending, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filters),
  });

  const isInitialLoading = isPending && isFetching;

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetch,
  };
}
