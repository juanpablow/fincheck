export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: "checking" | "investment" | "cash";
  color: string;
  currentBalance: number;
}
