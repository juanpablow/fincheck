import { sleep } from "@app/utils/sleep";
import { httpClient } from "../httpClient";
import { AxiosError } from "axios";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(body: SignupParams) {
  await sleep();

  try {
    const { data } = await httpClient.post<SignupResponse>(
      "/auth/signup",
      body,
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.message === "Network Error") {
        throw new Error("Server unreachable.");
      }
      if (error.code === "ECONNABORTED") {
        throw new Error("A requisição expirou. Tente novamente mais tarde.");
      } else if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("Não foi possível conectar ao servidor.");
      } else {
        throw new Error("Erro ao tentar fazer login.");
      }
    } else {
      throw new Error("Erro inesperado.");
    }
  }
}
