import { useMutation } from "@tanstack/react-query";
import toggleEmployeeStatus from "../_actions/toggle-employee-status";

interface ToggleEmployeeStatusParams {
  employeeId: string | number;
  data: {
    name: string;
    branch_id: number;
  };
}

export default function useToggleEmployeeStatus() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ employeeId, data }: ToggleEmployeeStatusParams) => {
      const payload = await toggleEmployeeStatus(employeeId, data);
      if ("errors" in payload) {
        throw new Error("Error toggling employee status");
      }
      return payload;
    },
  });

  return {
    toggleStatus: mutate,
    togglePending: isPending,
    toggleError: error,
  };
}
