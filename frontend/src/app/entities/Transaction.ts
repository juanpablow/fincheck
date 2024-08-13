export interface Transaction {
  id: string;
  name: string;
  categoryId: string;
  bankAccountId: string;
  value: number;
  date: string;
  type: "income" | "expense";
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}
