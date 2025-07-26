import { useMutation } from "@tanstack/react-query";
import createBransh from "../actions/create-bransh";

export default function useCreateBransh() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: CreateBranchBody) => {
      const payload = await createBransh(data);
      if ("errors" in payload) {
        throw new Error("error creating Bransh");
      }
      return payload;
    },
  });
  return { AddBransh: mutate, AddPending: isPending, AddError: error };
}
