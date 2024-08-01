import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "@app/hooks/useBankAccounts";
import { useCategories } from "@app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "@app/services/transactionsService";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.string().min(1, "Informe o valor"),
  name: z.string().min(1, "Informe o nome"),
  categoryId: z.string().min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Informe o banco"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts, isFetching } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionsService.create,
  });

  const handleSubmit = hookFormSubmit(async (body) => {
    try {
      await mutateAsync({
        ...body,
        value: Number(body.value),
        type: newTransactionType!,
        date: body.date.toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(
        newTransactionType === "expense"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!"
      );
      closeNewTransactionModal();
      reset();
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente"
        );
      } else {
        toast.error(
          newTransactionType === "expense"
            ? "Erro ao cadastrar a despesa!"
            : "Erro ao cadastrar a Receita!"
        );
      }
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    errors,
    control,
    accounts,
    isFetching,
    categories,
    isPending,
    closeNewTransactionModal,
    register,
    handleSubmit,
  };
}
