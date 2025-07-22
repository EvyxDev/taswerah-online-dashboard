declare type CreateBranchManagerResponse = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  branch_id: string;
  createdAt: string;
  updatedAt: string;
};

declare type CreateBranchManagerBody = {
  name: string;
  email: string;
  phone: string;
  password: string;
  branch_id: string;
  role?: string;
  status?: string;
};

type Branch = {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  is_active?: boolean;
  location?: string;
  created_at: string;
  updated_at: string;
};

declare type Staff = {
  id: number;
  name: string;
  email: string;
  phone: string;
  branch_id: number;
  role: "staff" | string;
  status: "active" | "inactive" | string;
  branch: Branch;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type UserRole = "staff" | "photographer" | "admin" | string;
type UserStatus = "active" | "inactive" | string;

declare type PhGrapher = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  branch_id: number;
  role: UserRole;
  status: UserStatus;
  branch: Branch;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};

declare type EmployeesResponse = {
  data: Staff[];
};

declare type PhGrapherResponse = {
  data: PhGrapher[];
  message: string;
};

declare type CreatePhotographerBody = {
  name: string;
  branch_id: number;
};
