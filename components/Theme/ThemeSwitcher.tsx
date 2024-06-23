"use client";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tabs defaultValue={theme} className="">
      <TabsList className=" border dark:border-neutral-800\ dark:bg-[#030303] px-4 py-2 rounded-lg flex gap-2 ">
        <TabsTrigger
          value="light"
          onClick={() => setTheme("light")}
          className="px-2 py-1 bg-black/5 dark:bg-white/25 rounded-md"
        >
          <SunIcon className="h-[1.25rem] w-[1.25rem]" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme("dark")}
          className="px-2 py-1 dark:bg-white/25 bg-black/5 rounded-md"
        >
          <MoonIcon className="h-[1.25rem] w-[1.25rem] rotate-90 transition-all dark:rotate-0" />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          onClick={() => setTheme("system")}
          className="px-2 py-1 dark:bg-white/25 bg-black/5 rounded-md"
        >
          <DesktopIcon className="h-[1.25rem] w-[1.25rem]" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

export default ThemeSwitcher;
