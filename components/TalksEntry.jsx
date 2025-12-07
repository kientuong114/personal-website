"use client";

export default function TalksEntry({ title, venue, links, description}) {
  return (
    <div className="w-full mb-8">
    <p className="text-xl md:text-2xl font-medium m-0 mb-2 md:mb-0">
        {title}
      </p>
      <p className="text-sm md:text-md font-light mb-2 md:mb-0">
        {venue}
      </p>
      <p className="font-light text-sm md:text-md">
        {links.map((link, index) => (
          <span key={index}>
            <a href={link.url} className="text-slate-500 underline hover:text-slate-900 transition-colors duration-300">[{link.label}]</a>{" "}
          </span>
        ))}
      </p>
      <p className="font-light">
        {description}
      </p>

    </div>
  );
}
