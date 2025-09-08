import { z } from "zod";

export const useAddBranchSchema = () => {
  return z.object({
    name: z.string().min(1, "Branch name is required"),
    adminEmail: z
      .string()
      .min(1, "Admin email is required")
      .email("Please enter a valid email address"),
    adminPassword: z
      .string()
      .min(6, "Admin password must be at least 6 characters long"),
    branchManagerEmail: z
      .string()
      .min(1, "Branch manager email is required")
      .email("Please enter a valid email address"),
    branchManagerPassword: z
      .string()
      .min(6, "Branch manager password must be at least 6 characters long"),
  });
};

export type AddBranchFields = z.infer<ReturnType<typeof useAddBranchSchema>>;
