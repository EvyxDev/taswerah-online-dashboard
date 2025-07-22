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
  branch_id: number;
  role?: string;
  status?: string;
};
declare type CreatePhotographerBody = {
  name: string;
  branch_id: number;
};
