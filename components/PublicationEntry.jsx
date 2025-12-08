"use client";

import { useState } from "react";

export default function PublicationEntry({ authors, title, venue, links, children}) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
      <div className="w-full mb-8 overflow-hidden">
    <p className="font-light text-sm md:text-md mb-2 md:mb-0">
        {authors}
      </p>
      <p className="text-xl md:text-2xl font-medium m-0 mb-2 md:mb-0">
        {title}
      </p>
      <p className="font-light text-sm md:text-md mb-2 md:mb-0">
        {venue}
      </p>
      <p className="font-light text-sm md:text-md mb-4 md:mb-0">
        {links.map((link, index) => (
          <span key={index}>
            <a href={link.url} className="text-slate-500 contrast-more:text-blue-700 underline contrast-more:underline-offset-2 contrast-more:decoration-2 hover:text-slate-900 contrast-more:hover:text-blue-900 transition-colors duration-300" aria-label={`${link.label} (external link)`}>[{link.label}]</a>{" "}
          </span>
        ))}
      </p>

      <button
        onClick={() => setShowAbstract(!showAbstract)}
        className="mt-2 px-4 py-2 bg-black/10 hover:bg-black/20 text-black font-light text-sm md:text-md rounded transition-colors duration-200 cursor-pointer"
        aria-expanded={showAbstract}
      >
        {showAbstract ? "Hide Abstract" : "Show Abstract"}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          showAbstract ? "opacity-100 mt-4" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
    <div className="p-4 md:p-16 bg-white/20 rounded">
            <div className={`flex flex-col gap-4 font-light italic transition-all duration-10 ${showAbstract ? "" : "opacity-0"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
