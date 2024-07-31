import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: "checking" | "investment" | "cash";
}

export async function create(body: CreateBankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", body);

  return data;
}
