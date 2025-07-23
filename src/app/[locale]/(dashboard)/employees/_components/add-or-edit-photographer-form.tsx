"use client";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

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
import useCreatePhotographer from "../_hooks/use-create-photographer";
import useEditPhotographer from "../_hooks/use-edit-photographer";
import { useSession } from "next-auth/react";
import { useBranches } from "../../_hooks/use-branshes";

const photographerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  branch: z.string().min(1, "Branch is required"),
});

type PhotographerFields = z.infer<typeof photographerSchema>;

export default function AddOrEditPhotographerForm({
  onSuccess,
  edit = false,
  photoGrapher,
}: {
  onSuccess?: () => void;
  edit?: boolean;
  photoGrapher?: PhGrapher;
}) {
  // Hooks
  const t = useTranslations("photographers");
  const { data } = useSession();
  const { AddPhotographer, AddPending, AddError } = useCreatePhotographer();
  const { EditPhotographer, EditPending, EditError } = useEditPhotographer();
  const { data: branches, isLoading } = useBranches(data?.token || "");

  // Determine which mutation to use
  const isPending = edit ? EditPending : AddPending;
  const error = edit ? EditError : AddError;

  // Form
  const form = useForm<PhotographerFields>({
    resolver: zodResolver(photographerSchema),
    defaultValues: {
      name: photoGrapher ? photoGrapher.name : "",
      branch: photoGrapher ? photoGrapher.branch_id.toString() : "",
    },
  });

  async function onSubmit(values: PhotographerFields) {
    const sendData: CreatePhotographerBody = {
      name: values.name,
      branch_id: Number(values.branch),
    };

    if (edit) {
      EditPhotographer(
        { data: sendData, id: photoGrapher?.id.toString() || "" },
        {
          onSuccess: (data) => {
            console.log("Photographer updated:", data);
            if (onSuccess) onSuccess();
          },
          onError: (err) => {
            console.log("Error updating photographer:", err);
          },
        }
      );
    } else {
      AddPhotographer(sendData, {
        onSuccess: (data) => {
          console.log("Photographer created:", data);
          if (onSuccess) onSuccess();
        },
        onError: (err) => {
          console.log("Error creating photographer:", err);
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
              {edit
                ? t("errorEditingPhotographer")
                : t("errorAddingPhotographer")}
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
