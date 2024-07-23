import { sleep } from "@app/utils/sleep";
import { httpClient } from "../httpClient";

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

  const { data } = await httpClient.post<SignupResponse>("/auth/signup", body);

  return data;
}
