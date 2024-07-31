import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "@app/services/bankAccountsService";

const schema = z.object({
  initialBalance: z.string().min(1, "Saldo inicial é obrigatório"),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  type: z.enum(["checking", "investment", "cash"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useDashboard();

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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create,
  });

  const handleSubmit = hookFormSubmit(async (body) => {
    try {
      await mutateAsync({
        ...body,
        initialBalance: Number(body.initialBalance),
      });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta bancária cadastrada com sucesso!");
      closeNewAccountModal();
      reset();
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente"
        );
      } else {
        toast.error("Ocorreu um erro ao criar sua Conta Bancária!");
      }
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  };
}
