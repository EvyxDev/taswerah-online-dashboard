"use client";

// React & Next.js

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

// Schemas & Types
import {
  AddEmployeesFields,
  useAddEmployeeSchema,
} from "@/lib/schemes/auth.schema";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { currentBranches } from "@/lib/constants/data.constant";

// Local Components
import { PasswordInput } from "@/components/common/password-input";
import useCreateEmployeer from "../_hooks/use-create-employeer";

export default function AddEmployeeForm() {
  // Hooks
  const t = useTranslations("employees");
  const { AddEmployeer, isPending, error } = useCreateEmployeer();
  const registerSchema = useAddEmployeeSchema();

  // Form
  const form = useForm<AddEmployeesFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      branch: "1",
      phone: "",
    },
  });

  // Handles form submission
  async function onSubmit(values: AddEmployeesFields) {
    const sendData: CreateBranchManagerBody = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      branch_id: "1",
    };
    AddEmployeer(sendData, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log("Error payload:", err);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-7"
      >
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {error.message || t("errorAddingEmployee")}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder={t("name")}
                      type="text"
                      required
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      placeholder={t("email")}
                      type="email"
                      required
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id="password"
                      placeholder={t("password")}
                      required
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      placeholder={t("phoneNumber")}
                      type="tel"
                      required
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder={t("selectBranch")} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentBranches.map((branch) => (
                        <SelectItem key={branch.name} value={branch.name}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center w-full mt-5 items-center">
          <Button
            className="main-button !py-7"
            type="submit"
            variant="default"
            disabled={isPending}
          >
            {isPending ? "adding" : t("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
