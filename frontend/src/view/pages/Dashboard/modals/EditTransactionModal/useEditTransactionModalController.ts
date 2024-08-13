import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "@app/hooks/useBankAccounts";
import { useCategories } from "@app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "@app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "@app/services/transactionsService";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().min(1, "Informe o valor"), z.number()]),
  name: z.string().min(1, "Informe o nome"),
  categoryId: z.string().min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Informe o banco"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.category?.id,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const { isPending: isPendingUpdate, mutateAsync: updateTransaction } =
    useMutation({
      mutationFn: transactionsService.update,
    });

  const { isPending: isPendingDelete, mutateAsync: deleteTransaction } =
    useMutation({
      mutationFn: transactionsService.remove,
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (body) => {
    try {
      await updateTransaction({
        ...body,
        id: transaction!.id,
        type: transaction!.type,
        value: Number(body.value),
        date: body.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction!.type === "expense"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!",
      );
      onClose();
    } catch (error) {
      console.log(body);

      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente",
        );
      } else {
        console.log(error);
        toast.error(
          transaction!.type === "expense"
            ? "Erro ao salvar a despesa!"
            : "Erro ao salvar a Receita!",
        );
      }
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction!.type === "expense"
          ? "Despesa deletada com sucesso!"
          : "Receita deletada com sucesso!",
      );
      onClose();
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente",
        );
      } else {
        toast.error(
          transaction!.type === "expense"
            ? "Erro ao deletar a despesa!"
            : "Erro ao deletar a Receita!",
        );
      }
    }
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return {
    errors,
    control,
    accounts,
    categories,
    isPendingUpdate,
    isPendingDelete,
    isDeleteModalOpen,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
  };
}
