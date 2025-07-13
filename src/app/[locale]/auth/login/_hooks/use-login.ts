import { LoginFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: LoginFields) => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (response?.error) throw new Error("Error in login in");

      return response;
    },
    onSuccess: (data) => {
      // Redirect to the callback URL after a successful login
      window.location.href = data?.url || "/";
    },
  });

  return { isPending, error, login: mutate };
}
