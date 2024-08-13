import { sleep } from "@app/utils/sleep";
import { httpClient } from "../httpClient";
import { AxiosError } from "axios";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export async function signin(body: SigninParams) {
  await sleep();

  try {
    const { data } = await httpClient.post<SigninResponse>(
      "/auth/signin",
      body,
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ECONNABORTED") {
        throw new Error("A requisição expirou. Tente novamente mais tarde.");
      } else if (error.response) {
        throw new Error("Erro ao tentar fazer login.");
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
