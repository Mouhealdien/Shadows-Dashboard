export interface Category {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  registerAt: string;
}

export interface Transaction {
  id: string;
  number: number;
  amount: number;
  transactionType: number;
  date: string;
}
export interface StudentShortType {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  birthDate: string;
  note: string;
  categoryIds: string[];
}
export interface Student {
  id: string;
  studentNumber?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  note?: string;
  birthDate: string;
  createdAt: string;
  totalBalance: number;
  categories: Category[];
  courses: Course[];
  transactions: Transaction[];
}
