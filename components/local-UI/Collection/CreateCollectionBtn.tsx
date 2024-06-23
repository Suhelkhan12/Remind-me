"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import CreateCollectionSheet from "./CreateCollectionSheet";

const CreateCollectionBtn = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 p-[1px]">
      <Button
        variant={"outline"}
        className="dark:text-white dark:bg-neutral-900 w-full bg-white group"
        onClick={() => setOpen(true)}
      >
        <span className=" bg-gradient-to-r from-red-500 to-orange-500 group-hover:to-orange-800 bg-clip-text text-transparent">
          Create collection
        </span>
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
};

export default CreateCollectionBtn;
