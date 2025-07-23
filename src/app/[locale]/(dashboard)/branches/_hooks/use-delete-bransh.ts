import { useMutation } from "@tanstack/react-query";
import deleteBransh from "../actions/delete-bransh";

export default function useDeleteBransh() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const payload = await deleteBransh(id);
      if ("errors" in payload) {
        throw new Error("Error deleting bransh");
      }
      return payload;
    },
  });

  return {
    DeleteBransh: mutate,
    DeletePending: isPending,
    DeleteError: error,
  };
}
