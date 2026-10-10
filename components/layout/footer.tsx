import { footerLinks } from "@/lib/data";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 py-12 px-6 sm:px-12 md:px-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Numéro de contact / Appel */}
        <p className="text-sm">
          Des questions ? Appelez le{" "}
          <span className="underline cursor-pointer">0805-543-094</span>
        </p>

        {/* Grille des liens (Style Netflix : colonnes responsives) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          {footerLinks.map((column) => (
            <ul key={column.id} className="space-y-3">
              {column.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:underline transition-colors hover:text-gray-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Bouton de sélection de langue */}
        <div className="pt-2">
          <div className="inline-flex items-center border border-gray-600 bg-black/40 rounded px-3 py-1.5 text-xs text-gray-300">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <select
              aria-label="Sélectionner la langue"
              className="bg-transparent text-white outline-none cursor-pointer"
              defaultValue="fr"
            >
              <option value="fr" className="bg-black text-white">
                Français
              </option>
              <option value="en" className="bg-black text-white">
                English
              </option>
            </select>
          </div>
        </div>

        {/* Copyright / Nom du site */}
        <p className="text-xs text-gray-500 pt-2">ClemStream — © 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
