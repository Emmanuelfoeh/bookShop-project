import Link from "next/link";

export default function Copyright() {
  return (
    <div className="text-center text-sm mt-12 text-gray-300">
      {"Copyright © "}
      <Link color="inherit" href="/">
        bookShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
