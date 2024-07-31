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
      body
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ECONNABORTED") {
        // Timeout error
        console.error("A requisição expirou. Tente novamente mais tarde.");
        throw new Error("A requisição expirou. Tente novamente mais tarde.");
      } else if (error.response) {
        // The server return a status error (ex: 4xx, 5xx)
        console.error("Erro de requisição:", error.response.data);
        throw new Error("Erro ao tentar fazer login.");
      } else if (error.request) {
        // The request was done, but dont receive responses from server
        console.error("Sem resposta do servidor:", error.request);
        throw new Error("Não foi possível conectar ao servidor.");
      } else {
        // Error during a request
        console.error("Erro durante a requisição:", error.message);
        throw new Error("Erro ao tentar fazer login.");
      }
    } else {
      // Error not from Axios
      console.error("Erro inesperado:", error);
      throw new Error("Erro inesperado.");
    }
  }
}
