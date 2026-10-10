"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="border-b-4 border-accent bg-black/90 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl w-full mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="uppercase font-sans font-bold text-xl tracking-wider text-white"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-brand">C</span>&E
        </Link>

        {/* NAVIGATION DESKTOP (Cachee sur mobile) */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                className={`nav-link transition-colors hover:text-white ${
                  pathname === item.href
                    ? "active text-white font-semibold"
                    : "text-zinc-400"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* BOUTON CONNEXION DESKTOP (Cache sur mobile) */}
        <div className="hidden md:block">
          <Button>Connexion</Button>
        </div>

        {/* BOUTON HAMBURGER MOBILE */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MENU DEROULANT MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-base transition-colors ${
                    pathname === item.href
                      ? "text-brand font-bold"
                      : "text-zinc-300 hover:text-white"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-zinc-800 w-full">
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Connexion
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
