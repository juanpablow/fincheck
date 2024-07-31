import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@app/services/authService";
import { SigninParams } from "@app/services/authService/signin";
import toast from "react-hot-toast";
import { useAuth } from "@app/hooks/useAuth";

const schema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return await authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (body) => {
    try {
      const { accessToken } = await mutateAsync(body);

      signin(accessToken);
    } catch (error) {
      if (error instanceof Error && error.message.includes("timeout")) {
        toast.error(
          "A solicitação demorou muito tempo para responder. Tente novamente"
        );
      } else {
        toast.error("E-mail ou senha inválidos");
      }
    }
  });
  return { handleSubmit, register, errors, isLoading };
}
