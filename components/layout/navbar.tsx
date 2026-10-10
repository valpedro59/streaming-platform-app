"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="border-b-4 border-accent">
      <nav className="max-w-7xl w-full mx-auto h-15 flex justify-between items-center py-1 px-8">
        <Link href="/" className="uppercase font-sans">
          <span className="text-brand">C</span>&E
        </Link>
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              className={`nav-link ${pathname === item.href && "active"}`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <Button>Connexion</Button>
      </nav>
    </div>
  );
};

export default Navbar;
