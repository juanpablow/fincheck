import { bankAccountsService } from "@app/services/bankAccountsService";
import { useQuery } from "@tanstack/react-query";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
  });

  return {
    accounts: data ?? [],
    isFetching,
  };
}
