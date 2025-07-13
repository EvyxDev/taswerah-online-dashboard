import { useTranslations } from "next-intl";
import { z } from "zod";

export const useAddEmployeeSchema = () => {
  const t = useTranslations();
  return z.object({
    name: z
      .string({ required_error: t("") })
      .min(2, "Name must be at least 2 characters"),

    branch: z
      .string({ required_error: "Branch is required" })
      .min(1, "Branch cannot be empty"),

    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),

    phone: z.string({ required_error: "Phone number is required" }),

    password: z.string({ required_error: "Password is required" }),
  });
};

export type AddEmployeesFields = z.infer<
  ReturnType<typeof useAddEmployeeSchema>
>;

export const useLoginSchema = () => {
  return z.object({
    email: z
      .string({ required_error: "Email address is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    // .regex(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //   "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    // ),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
