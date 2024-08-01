export interface Transaction {
  id: string;
  name: string;
  value: number;
  date: string;
  type: "income" | "expense";
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}
