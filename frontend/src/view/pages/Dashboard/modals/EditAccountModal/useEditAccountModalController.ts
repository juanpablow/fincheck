import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "@app/services/bankAccountsService";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, "Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  type: z.enum(["checking", "investment", "cash"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountsService.update,
  });

  const { isPending: isPendingDelete, mutateAsync: deleteAccount } =
    useMutation({
      mutationFn: bankAccountsService.remove,
    });

  const handleSubmit = hookFormSubmit(async (body) => {
    try {
      await updateAccount({
        ...body,
        initialBalance: Number(body.initialBalance),
        id: accountBeingEdited!.id,
      });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta bancária editada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente"
        );
      } else {
        toast.error("Erro ao salvar as alterações!");
      }
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await deleteAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta bancária deletada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente"
        );
      } else {
        toast.error("Erro ao deletar a conta bancária!");
      }
    }
  }

  return {
    isEditAccountModalOpen,
    errors,
    control,
    isPending,
    isDeleteModalOpen,
    isPendingDelete,
    handleSubmit,
    closeEditAccountModal,
    register,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  };
}
