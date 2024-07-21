import { httpClient } from "../httpClient";

interface MeResponse {
  name: string;
  email: string;
}

export async function me() {
  return await httpClient.get<MeResponse>("/users/me");
}
