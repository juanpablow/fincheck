import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  name: string;
  value: number;
  date: string;
  type: "income" | "expense";
}

export async function create(body: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", body);

  return data;
}
