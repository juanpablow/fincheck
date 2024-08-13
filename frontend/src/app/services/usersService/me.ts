import { User } from "@app/entities/User";
import { httpClient } from "../httpClient";

type MeResponse = User;

export async function me() {
  return await httpClient.get<MeResponse>("/users/me");
}
