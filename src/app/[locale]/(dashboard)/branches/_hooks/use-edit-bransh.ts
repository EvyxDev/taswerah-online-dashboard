import { useMutation } from "@tanstack/react-query";
import editBransh from "../actions/edit.bransh";

export default function useEditBransh() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: CreateBranchBody;
      id: string;
    }) => {
      const payload = await editBransh(data, id);
      if ("errors" in payload) {
        throw new Error("Error Editing Bransh");
      }
      return payload;
    },
  });

  return { EditBransh: mutate, EditPending: isPending, EditError: error };
}
