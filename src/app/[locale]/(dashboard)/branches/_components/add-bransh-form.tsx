"use client";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

// Schemas & Types
import {
  AddBranchFields,
  useAddBranchSchema,
} from "@/lib/schemes/branch.schema";

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

import { Alert, AlertDescription } from "@/components/ui/alert";

// Local Components
import useCreateBransh from "../_hooks/use-create-bransh";
import { toast } from "sonner";

export default function AddorEditBranshForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  // Hooks
  const t = useTranslations("branches");
  const { AddBransh, AddPending, AddError } = useCreateBransh();
  const branchSchema = useAddBranchSchema();

  // Form
  const form = useForm<AddBranchFields>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: "",
    },
  });

  // Handles form submission
  async function onSubmit(values: AddBranchFields) {
    const sendData: CreateBranchBody = {
      name: values.name,
    };

    AddBransh(sendData, {
      onSuccess: (data) => {
        console.log("Branch created:", data);
        toast.success(t("branch_created_successfully"));
        form.reset();
        if (onSuccess) onSuccess();
      },
      onError: (err) => {
        console.log("Error creating branch:", err);
        toast.error(t("error_creating_branch"));
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
        {AddError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{t("errorAddingBranch")}</AlertDescription>
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
                      disabled={AddPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-center w-full mt-5 items-center">
          <Button
            className="main-button !py-7"
            type="submit"
            variant="default"
            disabled={AddPending}
          >
            {AddPending ? t("adding") : t("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
