import Link from "next/link";
const Footer = () => {
  return (
    <footer className=" text-base py-4 dark:bg-black bg-white w-full text-center fixed bottom-0">
      Made with ❤️ by{" "}
      <Link
        href="https://www.linkedin.com/in/suhell-khan/"
        target="_blank"
        className=" text-blue-600 underline underline-offset-8"
      >
        Suhel
      </Link>
    </footer>
  );
};

export default Footer;
