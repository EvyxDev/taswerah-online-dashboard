"use client";

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

// Local Components
import { PasswordInput } from "@/components/common/password-input";
import useCreateEmployeer from "../_hooks/use-create-employeer";
import useEditEmployeer from "../_hooks/use-edit-employeer";
import { useSession } from "next-auth/react";
import { useBranches } from "../../_hooks/use-branshes";

export default function AddoREditEmployeeForm({
  onSuccess,
  edit = false,
}: {
  onSuccess?: () => void;
  edit?: boolean;
}) {
  // Hooks
  const t = useTranslations("employees");
  const { data } = useSession();
  const { AddEmployeer, AddPending, AddError } = useCreateEmployeer();
  const { EditEmployeer, EditPending, EditError } = useEditEmployeer();
  const registerSchema = useAddEmployeeSchema();
  const { data: branches, isLoading } = useBranches(data?.token || "");
  // Determine which mutation to use
  const isPending = edit ? EditPending : AddPending;
  const error = edit ? EditError : AddError;
  // Form
  const form = useForm<AddEmployeesFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      branch: "",
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
      branch_id: values.branch,
      role: "staff",
      status: "active",
    };
    console.log(sendData);
    if (edit) {
      EditEmployeer(
        { data: sendData, id: "24" },
        {
          onSuccess: (data) => {
            console.log("Employee updated:", data);
            if (onSuccess) onSuccess();
          },
          onError: (err) => {
            console.log("Error updating employee:", err);
          },
        }
      );
    } else {
      AddEmployeer(sendData, {
        onSuccess: (data) => {
          console.log("Employee created:", data);
          if (onSuccess) onSuccess();
        },
        onError: (err) => {
          console.log("Error creating employee:", err);
        },
      });
    }
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
              {edit ? t("errorEditingEmployee") : t("errorAddingEmployee")}
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
                      required={!edit}
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
                    value={field.value}
                    disabled={isPending || isLoading}
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder={t("selectBranch")} />
                    </SelectTrigger>
                    <SelectContent>
                      {branches?.map((branch) => (
                        <SelectItem key={branch.id} value={String(branch.id)}>
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
            {isPending
              ? edit
                ? t("updating")
                : t("adding")
              : edit
              ? t("update")
              : t("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
