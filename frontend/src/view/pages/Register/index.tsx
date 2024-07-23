import { Link } from "react-router-dom";
import { Button } from "@view/components/Button";
import { Input } from "@view/components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { register, handleSubmit, errors, isLoading } = useRegisterController();
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="tracking-[-0.5px] text-teal-900 font-medium"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input
          placeholder="Nome"
          autoComplete="name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
