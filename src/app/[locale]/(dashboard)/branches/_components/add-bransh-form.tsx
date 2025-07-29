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
import useEditBransh from "../_hooks/use-edit-bransh";
import { toast } from "sonner";

export default function AddorEditBranshForm({
  onSuccess,
  edit = false,
  bransh,
}: {
  onSuccess?: () => void;
  edit?: boolean;
  bransh?: Branch;
}) {
  // Hooks
  const t = useTranslations("branches");
  const { AddBransh, AddPending, AddError } = useCreateBransh();
  const { EditBransh, EditPending, EditError } = useEditBransh();
  // const { data: allEmployees } = useEmployees();
  // const { data: allPhotographers } = usePhotographers();
  const branchSchema = useAddBranchSchema();
  // Determine which mutation to use
  const isPending = edit ? EditPending : AddPending;
  const error = edit ? EditError : AddError;

  // Form
  const form = useForm<AddBranchFields>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: bransh ? bransh.name : "",
      location: bransh ? bransh.location : "",
    },
  });

  // Handles form submission
  async function onSubmit(values: AddBranchFields) {
    // const photographerIds = allPhotographers?.data
    //   ?.filter((photographer) =>
    //     values.photographers.includes(photographer.name)
    //   )
    //   .map((photographer) => photographer.id);
    // const employeeIds =
    //   allEmployees?.data?.data
    //     ?.filter((employee) => values.employees.includes(employee.name))
    //     .map((employee) => employee.id) || [];

    const sendData: CreateBranchBody = {
      name: values.name,
      location: values.location,
    };
    if (edit) {
      EditBransh(
        { data: sendData, id: bransh?.id.toString() || "" },
        {
          onSuccess: (data) => {
            console.log("Branch updated:", data);
            toast.success(t("branch_updated_successfully"));
            form.reset();
            if (onSuccess) onSuccess();
          },
          onError: (err) => {
            console.log("Error updating branch:", err);
            toast.error(t("error_updating_branch"));
          },
        }
      );
    } else {
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
              {edit ? t("errorEditingBranch") : t("errorAddingBranch")}
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="location"
                      placeholder={t("location")}
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
        </div>

        {/* <div className="flex flex-row gap-4"> */}
        {/* Photographers */}
        {/* <div className="flex-1">
            <FormField
              control={form.control}
              name="photographers"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs -mt-[7px]"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select Photographers" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {allPhotographers?.data.map((photographer) => (
                            <MultiSelectorItem
                              key={photographer.id}
                              value={photographer.name}
                            >
                              {photographer.name}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

        {/* Employees */}
        {/* <div className="flex-1">
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs -mt-[7px]"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select Employees" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {allPhotographers?.data?.map((photographer) => (
                            <MultiSelectorItem
                              key={photographer.id}
                              value={photographer.name}
                            >
                              {photographer.name}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
        {/* </div> */}

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
