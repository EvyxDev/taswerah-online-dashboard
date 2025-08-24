declare type Branch = {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
};

declare type CreateBranchBody = {
  name: string;
  is_active?: boolean;
};
