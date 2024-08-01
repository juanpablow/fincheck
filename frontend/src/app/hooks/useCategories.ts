import { categoriesService } from "@app/services/categoriesService";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
  });

  return {
    categories: data ?? [],
    isFetching,
  };
}
