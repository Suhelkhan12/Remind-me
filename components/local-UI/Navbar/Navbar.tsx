import Logo from "./Logo";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className=" flex w-full items-center justify-between px-4 py-8 h-16 border-blue-400">
      <Logo />
      <div className=" flex gap-4 items-center">
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
