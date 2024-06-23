"use client";

import { completeTask } from "@/actions/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { useTransition } from "react";

const TaskCard = (props: Task) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <div className=" flex items-center gap-3">
      <Checkbox
        id={props.id.toString()}
        className=" size-5 "
        checked={props.completed}
        onCheckedChange={(checked) => {
          startTransition(async () => {
            await completeTask(props.id, checked as boolean);
          });
        }}
      />
      <label
        htmlFor={props.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:decoration-white ",
          props.completed && "line-through"
        )}
      >
        {props.content}
      </label>
    </div>
  );
};

export default TaskCard;
