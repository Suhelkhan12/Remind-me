import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useForm } from "react-hook-form";
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/createCollection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AllCollectionColors, CollectionColor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { createCollection } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const CreateCollectionSheet = ({ open, onOpenChange }: Props) => {
  const form = useForm<createCollectionSchemaType>({
    defaultValues: {
      name: "",
      color: "",
    },
    resolver: zodResolver(createCollectionSchema),
  });

  async function formSubmitHandler(values: createCollectionSchemaType) {
    // server action for our prism db
    try {
      await createCollection(values);
      openChangeWrapper(false);
      toast({
        title: "Yay! 🎊 🎊 ",
        description: "Collection created successfully",
      });
    } catch (err: any) {
      toast({
        title: "Oops!",
        description: "Something went wrong please try again later.",
        variant: "destructive",
      });
    }
  }

  function openChangeWrapper(open: boolean) {
    form.reset();
    onOpenChange(open);
  }

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Collection</SheetTitle>
          <SheetDescription>
            Collections help you manage your task.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            className=" space-y-4 flex flex-col"
            onSubmit={form.handleSubmit(formSubmitHandler)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Collection name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          AllCollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(AllCollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              "w-full rounded-md my-1 focus:text-white text-white",
                              AllCollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className=" flex flex-col gap-1 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            onClick={form.handleSubmit(formSubmitHandler)}
            className={cn(
              form.watch("color") &&
                AllCollectionColors[form.getValues("color") as CollectionColor]
            )}
          >
            {form.formState.isSubmitting ? (
              <ReloadIcon className=" animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCollectionSheet;
