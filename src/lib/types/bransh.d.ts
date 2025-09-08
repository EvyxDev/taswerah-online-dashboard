declare type Branch = {
  id: number;
  name: string;
  manager_email: string;
  manager_password: string;
  admin_email: string;
  admin_password: string;
  token: string;
  created_at: string | null;
  updated_at: string | null;
};

declare type CreateBranchBody = {
  name: string;
  adminEmail: string;
  adminPassword: string;
  branchManagerEmail: string;
  branchManagerPassword: string;
  is_active?: boolean;
};
