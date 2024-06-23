"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Collection, Task } from "@prisma/client";
import { useMemo, useState, useTransition } from "react";
import { AllCollectionColors, CollectionColor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  CaretDownIcon,
  CaretUpIcon,
  SymbolIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import PlusIcon from "@/components/icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCollection } from "@/actions/actions";
import { toast } from "@/components/ui/use-toast";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "../Task/TaskCard";

interface Props {
  collection: Collection & {
    tasks: Task[];
  };
}

const CollectionCard = ({ collection }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, startTransition] = useTransition();
  const [showCreateModel, setShowCreateModel] = useState(false);

  const tasks = collection.tasks;

  // calling delete sever action
  async function removeCollection() {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Success",
        description: "collection deleted successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  const totalTasks = collection.tasks.length;
  const taskCompleted = useMemo(() => {
    return collection.tasks.filter((task) => task.completed).length;
  }, [collection.tasks]);

  const progress =
    collection.tasks.length === 0 ? 0 : (taskCompleted / totalTasks) * 100;

  return (
    <>
      <CreateTaskDialog
        open={showCreateModel}
        setOpen={setShowCreateModel}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            className={cn(
              "flex w-full  justify-between p-6",
              isOpen && "rounded-b-none",
              AllCollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className=" text-white font-bold text-xl ">
              {collection.name}
            </span>
            {!isOpen && <CaretDownIcon className=" size-6 text-white" />}
            {isOpen && <CaretUpIcon className=" size-6 text-white" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className=" flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className=" flex items-center justify-center gap-1 p-8 py-12 rounded-md"
              onClick={() => setShowCreateModel(true)}
            >
              <p>There are no tasks available.</p>
              <span
                className={cn(
                  "bg-clip-text text-transparent text-sm",
                  AllCollectionColors[collection.color as CollectionColor]
                )}
              >
                Create one
              </span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress value={progress} className="rounded-none" />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className=" h-10 px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
            <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
            {isLoading && (
              <p>
                <SymbolIcon className=" animate-spin" />
              </p>
            )}
            {!isLoading && (
              <div className=" flex items-center gap-4">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className=" size-4"
                  onClick={() => setShowCreateModel(true)}
                >
                  <PlusIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default CollectionCard;
