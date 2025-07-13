import { useMutation } from "@tanstack/react-query";
import createEmployeer from "../_actions/create-employeer";

export default function useCreateEmployeer() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: CreateBranchManagerBody) => {
      const payload = await createEmployeer(data);
      if ("errors" in payload) {
        throw payload;
      }
      return payload;
    },
  });
  return { AddEmployeer: mutate, isPending, error };
}
