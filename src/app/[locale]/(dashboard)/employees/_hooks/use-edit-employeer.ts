import { useMutation } from "@tanstack/react-query";
import editEmployeer from "../_actions/edit.employeer";

export default function useEditEmployeer() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: CreateBranchManagerBody;
      id: string;
    }) => {
      const payload = await editEmployeer(data, id);
      if ("errors" in payload) {
        throw new Error("Error creating employee");
      }
      return payload;
    },
  });

  return { EditEmployeer: mutate, EditPending: isPending, EditError: error };
}
