import { transactionsService } from "@app/services/transactionsService";
import { useQuery } from "@tanstack/react-query";

export function useTransactions() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionsService.getAll({
        month: 7,
        year: 2024,
      }),
  });

  return {
    transactions: data ?? [],
  };
}
