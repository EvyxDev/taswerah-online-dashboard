import { z } from "zod";

export const useAddBranchSchema = () => {
  return z.object({
    name: z.string().min(1, "Branch name is required"),
    employees: z.array(z.string()).min(1, {
      message: "Please select at least one employee",
    }),
    photographers: z.array(z.string()).min(1, {
      message: "Please select at least one photographer",
    }),
    location: z.string().min(1, "Location is required"),
  });
};

export type AddBranchFields = z.infer<ReturnType<typeof useAddBranchSchema>>;
