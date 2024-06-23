"use client";
import { Collection } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AllCollectionColors, CollectionColor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { createTask } from "@/actions/actions";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  collection: Collection;
}

const CreateTaskDialog = ({ open, setOpen, collection }: Props) => {
  const openChangeWrapper = (open: boolean) => {
    setOpen(open);
    form.reset();
  };

  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
      content: "",
    },
  });

  async function onSubmit(values: createTaskSchemaType) {
    console.log(values);
    // Add your submission logic here, e.g., API call to create a task
    try {
      await createTask(values);
      toast({
        title: "Sucess",
        description: "Task created successfylly.",
      });
      openChangeWrapper(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[424px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add task to collection{" "}
            <span
              className={cn(
                "px-[1px] bg-clip-text text-transparent",
                AllCollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you
            want.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Content</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Enter task content"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the content of your task.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={
              (cn("w-full dark:text-white text-white "),
              AllCollectionColors[collection.color as CollectionColor])
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            {!form.formState.isSubmitting && "Confirm"}
            {form.formState.isSubmitting && (
              <ReloadIcon className=" animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
