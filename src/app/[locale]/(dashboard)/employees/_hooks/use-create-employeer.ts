import { useMutation } from "@tanstack/react-query";
import createEmployeer from "../_actions/create-employeer";

export default function useCreateEmployeer() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: CreateBranchManagerBody) => {
      const payload = await createEmployeer(data);
      if ("errors" in payload) {
        throw new Error("error creating Employee");
      }
      return payload;
    },
  });
  return { AddEmployeer: mutate, AddPending: isPending, AddError: error };
}
