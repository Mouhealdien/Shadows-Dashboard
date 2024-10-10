export interface EmployeePagination {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
}

export interface Employee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  role: string;
}

export interface EmployeeWithPassword {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  role: string;
}

export interface EmployeeResponse {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
  data: Employee[];
}
