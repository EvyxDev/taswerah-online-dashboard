import { z } from "zod";

export const useAddBranchSchema = () => {
  return z.object({
    name: z.string().min(1, "Branch name is required"),
  });
};

export type AddBranchFields = z.infer<ReturnType<typeof useAddBranchSchema>>;
